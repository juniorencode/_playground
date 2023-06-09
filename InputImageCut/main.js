class InputImageCut {
  constructor(options) {
    if (!options || !options.container)
      throw new Error('InputImageCut constructor: missing arguments');

    this.container = options.container;
    this.shape = options.shape || 'square';
    this.appendContent();

    this.resultImage = {
      width: options.width || options.size || 500,
      height: options.height || options.size || 500
    };

    // events manager
    this._eventHandlers = {};

    this.init();
  }

  init() {
    this.file = document.createElement('input');
    this.file.type = 'file';
    this.image = {
      file: new Image(),
      ratio: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      temp: { x: 0, y: 0 },
      size: { width: 0, height: 0 },
      scale: {
        value: 0,
        step: 0.1,
        min: 1,
        max: 3,
        temp: false
      },
      isFiltered: false
    };

    this.watermarks = {
      default: {
        icon: 'far fa-image',
        label: 'Drop your photo here or browse your computer'
      },
      drop: {
        icon: 'fas fa-cloud-download-alt',
        label: 'Drop your photo'
      },
      wrong: {
        icon: 'fas fa-exclamation-circle',
        label: 'Only images allowed'
      }
    };
    this.validImageFormats = ['image/png', 'image/jpeg'];

    // mouse
    this.mouseDown = false;

    // canvas
    this.background = this.buildCanvas('background');
    this.filter = this.buildCanvas('filter');
    this.setSizeBackground();

    // start
    this.appendWatermark(this.watermarks.default);
    this.addEventsDefault();
  }

  setSizeBackground() {
    const { width: resultWidth, height: resultHeight } = this.resultImage;

    this.background.canvas.width = resultWidth * 2;
    this.background.canvas.height = resultHeight * 1.2;
  }

  setSizeFilter() {
    const { clientWidth, clientHeight } = this.background.canvas;

    this.filter.canvas.width = clientWidth;
    this.filter.canvas.height = clientHeight;
  }

  setFile(file) {
    if (!file) return;
    if (!this.validImageFormats.includes(file.type)) {
      this.wrongFormat();
      return;
    }
    this.image.file.src = URL.createObjectURL(file);
  }

  wrongFormat() {
    this.clearContainer();
    this.appendWatermark(this.watermarks.wrong);

    setTimeout(() => {
      this.clearContainer();
      this.appendWatermark(this.watermarks.default);
    }, 2000);
  }

  normalizeSize() {
    const { width, height } = this.image.file;
    const { width: resultWidth, height: resultHeight } = this.resultImage;

    this.image.size.width =
      width > height ? (width * resultWidth) / height : resultWidth;
    this.image.size.height =
      width < height ? (height * resultHeight) / width : resultHeight;
  }

  normalizePosition() {
    const { canvas } = this.background;
    const { width, height } = this.image.size;

    this.image.position.x = (canvas.width - width) / 2;
    this.image.position.y = (canvas.height - height) / 2;
  }

  setScaleFactors() {
    const { canvas } = this.background;
    this.image.ratio = {
      x: canvas.width / canvas.clientWidth,
      y: canvas.height / canvas.clientHeight
    };
  }

  doCalculateMove(relativeX, relativeY) {
    const { ratio, temp } = this.image;
    const x = relativeX * ratio.x - temp.x;
    const y = relativeY * ratio.y - temp.y;
    this.doCalculatePosition(x, y);
  }

  doCalculateScale() {
    const { canvas } = this.filter;
    const { x: posX, y: posY } = this.image.position;
    const { width: fileWidth, height: fileHeight } = this.image.file;
    const { width, height } = this.image.size;
    const { x: ratioX, y: ratioY } = this.image.ratio;
    const { value: scale } = this.image.scale;
    const { width: resultWidth, height: resultHeight } = this.resultImage;
    const newWidth =
      (fileWidth > fileHeight
        ? (fileWidth * resultWidth) / fileHeight
        : resultWidth) * scale;
    const newHeight =
      (fileWidth < fileHeight
        ? (fileHeight * resultHeight) / fileWidth
        : resultHeight) * scale;
    const deltaX = -(-posX + (canvas.clientWidth / 2) * ratioX) / width;
    const deltaY = -(-posY + (canvas.clientHeight / 2) * ratioY) / height;
    const x = deltaX * newWidth + (canvas.clientWidth / 2) * ratioX;
    const y = deltaY * newHeight + (canvas.clientHeight / 2) * ratioY;

    this.image.size.width = newWidth;
    this.image.size.height = newHeight;
    this.doCalculatePosition(x, y);
  }

  doCalculatePosition(x, y) {
    const { canvas } = this.background;
    const { width, height } = this.image.size;
    const { width: resultWidth, height: resultHeight } = this.resultImage;
    const halfHorizontal = (canvas.width - resultWidth) / 2;
    const halfVertical = (canvas.height - resultHeight) / 2;

    if (x - halfHorizontal > 0) x = halfHorizontal;
    else if (x - halfHorizontal + width < resultWidth)
      x = halfHorizontal + resultWidth - width;

    if (y - halfVertical > 0) y = halfVertical;
    else if (y - halfVertical + height < resultHeight)
      y = halfVertical + resultHeight - height;

    this.image.position.x = x;
    this.image.position.y = y;
  }

  // draw canvas
  drawBackground() {
    const { file, size, position } = this.image;
    const { width, height } = file;

    this.clearBackground();
    this.background.ctx.drawImage(
      file,
      0,
      0,
      width,
      height,
      position.x,
      position.y,
      size.width,
      size.height
    );
  }

  drawFilter() {
    const { width: bgWidth, height: bgHeight } = this.background.canvas;
    const { width: filterWidth, height: filterHeight } = this.filter.canvas;
    const { width: resultWidth, height: resultHeight } = this.resultImage;
    const width = (filterWidth * resultWidth) / bgWidth;
    const height = (filterHeight * resultHeight) / bgHeight;
    const region = new Path2D();

    switch (this.shape) {
      case 'square':
        region.rect(
          (filterWidth - width) / 2,
          (filterHeight - height) / 2,
          width,
          height
        );
        break;
      case 'circle':
        region.arc(
          filterWidth / 2,
          filterHeight / 2,
          height / 2,
          0,
          2 * Math.PI
        );
        break;
      default:
        break;
    }

    region.rect(0, 0, filterWidth, filterHeight);
    this.filter.ctx.clip(region, 'evenodd');
    this.filter.ctx.fillStyle = 'rgba(255, 255, 255, .8)';
    this.filter.ctx.rect(0, 0, filterWidth, filterHeight);
    this.filter.ctx.fill();
  }

  // append child
  appendWatermark(type) {
    const watermark = document.createElement('div');
    const icon = document.createElement('i');
    const paragraph = document.createElement('p');
    const text = document.createTextNode(type.label);
    watermark.classList.add('InputImageCut__watermark');
    icon.className = type.icon;
    paragraph.append(text);
    watermark.append(icon);
    watermark.append(paragraph);
    this.content.append(watermark);
  }

  appendContent() {
    this.content = document.createElement('div');
    this.content.classList.add('InputImageCut__content');
    this.container.append(this.content);
  }

  appendCanvas() {
    this.content.append(this.background.canvas);
    this.content.append(this.filter.canvas);
    this.setSizeFilter();
  }

  appendScale() {
    const div = document.createElement('div');
    const range = document.createElement('input');
    div.classList.add('InputImageCut__zoom');
    range.classList.add('InputImageCut__range');
    range.type = 'range';
    range.min = this.image.scale.min;
    range.max = this.image.scale.max;
    range.step = this.image.scale.step;
    range.value = this.image.scale.min;
    div.append(range);
    this.container.append(div);
    this.addListener(range, 'input', e => this.handleRange(e));
  }

  appendCloseButton() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.classList.add('InputImageCut__close');
    icon.classList.add('fas', 'fa-times');
    button.append(icon);
    this.content.append(button);
    this.addListener(button, 'click', () => this.reset());
  }

  // clear and reset
  clearContainer() {
    this.container.innerHTML = '';
    this.appendContent();
  }

  clearContent() {
    this.content.innerHTML = '';
  }

  clearBackground() {
    const { canvas, ctx } = this.background;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  reset() {
    this._eventHandlers = {};
    this.clearContainer();
    setTimeout(() => this.init(), 1);
  }

  // handlers event
  handleOpenInputFile() {
    this.file.click();
  }

  handleSelectFile() {
    this.setFile(this.file.files[0]);
  }

  handleUploadFile() {
    // normalize
    this.normalizeSize();
    this.normalizePosition();

    // prepare
    this.removeEventsDefault();
    this.clearContainer();
    this.appendCanvas();
    this.appendScale();
    this.appendCloseButton();
    this.addEventsFilter();

    // draw
    if (!this.image.isFiltered) {
      this.drawFilter();
      this.image.isFiltered = true;
    }

    this.drawBackground();
    this.setScaleFactors();
  }

  handleDragEnter(e) {
    e.preventDefault();
    this.clearContent();
    this.appendWatermark(this.watermarks.drop);
    this.container.classList.add('InputImageCut--dragover');
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.clearContent();
    this.appendWatermark(this.watermarks.default);
    this.container.classList.remove('InputImageCut--dragover');
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDropFile(e) {
    e.preventDefault();
    this.container.classList.remove('InputImageCut--dragover');
    this.setFile(e.dataTransfer.files[0]);
  }

  handleMouseDown(e) {
    const { ratio, position } = this.image;

    this.mouseDown = true;
    this.image.temp.x = e.offsetX * ratio.x - position.x;
    this.image.temp.y = e.offsetY * ratio.y - position.y;
  }

  handleTouchStart() {
    this.image.temp.x = null;
    this.image.temp.y = null;
    this.image.scale.temp = false;
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  handleMouseMove(e) {
    if (!this.mouseDown) return;

    const { canvas } = this.filter;
    const rect = canvas.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    this.doCalculateMove(relativeX, relativeY);
    this.drawBackground();
  }

  handleTouchMove(e) {
    const { top, left } = this.background.canvas.getBoundingClientRect();
    const { x: ratioX, y: ratioY } = this.image.ratio;
    const { x, y } = this.image.position;
    const { scrollX, scrollY } = window;
    const { pageX, pageY } = e.targetTouches[0];

    e.preventDefault();

    if (e.targetTouches.length === 1) {
      const relativeX = pageX - (Math.round(left + scrollX) + 2);
      const relativeY = pageY - (Math.round(top + scrollY) + 2);

      if (!this.image.temp.x || !this.image.temp.y) {
        this.image.temp.x = relativeX * ratioX - x;
        this.image.temp.y = relativeY * ratioY - y;
      }

      this.doCalculateMove(relativeX, relativeY);
    } else {
      this.handleGesturePinchZoom(e);
    }

    this.drawBackground();
  }

  handleZoom(e) {
    const { value, step, min, max } = this.image.scale;
    let scale = value;

    e.preventDefault();
    scale += Math.sign(e.deltaY) * -1 * step;
    scale = Math.min(Math.max(min, scale), max);
    this.image.scale.value = Number(scale.toFixed(1));

    this.doCalculateScale();
    this.drawBackground();
  }

  handleGesturePinchZoom(e) {
    const { value, min, max, temp } = this.image.scale;
    const p1 = e.targetTouches[0];
    const p2 = e.targetTouches[1];
    const powX = Math.pow(p2.pageX - p1.pageY, 2);
    const powY = Math.pow(p2.pageY - p1.pageY, 2);
    const zoomScale = Math.sqrt(powX + powY); // euclidian distance
    const zoom = temp ? zoomScale - temp : 0;
    const scale = Math.min(Math.max(min, value + zoom / 100), max);
    this.image.scale.temp = zoomScale;
    this.image.scale.value = Number(scale.toFixed(2));

    this.doCalculateScale();
  }

  handleRange(e) {
    this.image.scale.value = Number(e.target.value);
    this.doCalculateScale();
    this.drawBackground();
  }

  handleResize() {
    this.setScaleFactors();
    this.drawBackground();
    this.setSizeFilter();
    this.drawFilter();
  }

  // events pack
  addEventsDefault() {
    this.addListener(this.container, 'click', () => this.handleOpenInputFile());
    this.addListener(this.container, 'dragenter', e => this.handleDragEnter(e));
    this.addListener(this.container, 'dragleave', e => this.handleDragLeave(e));
    this.addListener(this.container, 'dragover', e => this.handleDragOver(e));
    this.addListener(this.container, 'drop', e => this.handleDropFile(e));
    this.addListener(this.file, 'change', () => this.handleSelectFile());
    this.addListener(this.image.file, 'load', () => this.handleUploadFile());
  }

  addEventsFilter() {
    const { canvas } = this.filter;

    this.addListener(canvas, 'mousedown', e => this.handleMouseDown(e));
    this.addListener(canvas, 'mouseup', () => this.handleMouseUp());
    this.addListener(canvas, 'mouseleave', () => this.handleMouseUp());
    this.addListener(canvas, 'mousemove', e => this.handleMouseMove(e));
    this.addListener(canvas, 'wheel', e => this.handleZoom(e));
    this.addListener(canvas, 'touchstart', () => this.handleTouchStart());
    this.addListener(canvas, 'touchmove', e => this.handleTouchMove(e));
    this.addListener(window, 'resize', () => this.handleResize());
  }

  removeEventsDefault() {
    this.removeListeners(this.container, 'click');
  }

  // events manager
  addListener(node, event, handler, capture = false) {
    if (!(node in this._eventHandlers)) this._eventHandlers[node] = {};
    if (!(event in this._eventHandlers[node]))
      this._eventHandlers[node][event] = [];

    this._eventHandlers[node][event].push([handler, capture]);
    node.addEventListener(event, handler, capture);
  }

  removeListenersBase(node, event, handlers) {
    const eventHandlers = handlers[event];
    for (let i = 0; i < eventHandlers.length; i++) {
      const handler = eventHandlers[i];
      node.removeEventListener(event, handler[0], handler[1]);
    }
  }

  removeListeners(node, event) {
    if (!(node in this._eventHandlers)) return;
    const handlers = this._eventHandlers[node];
    event in handlers && this.removeListenersBase(node, event, handlers);
  }

  removeAllListeners(node) {
    if (!(node in this._eventHandlers)) return;
    const handlers = this._eventHandlers[node];
    for (const event in handlers) {
      this.removeListenersBase(node, event, handlers);
    }
  }

  // helpers
  buildCanvas(name) {
    const object = {};
    object.canvas = document.createElement('canvas');
    object.canvas.classList.add('InputImageCut__' + name);
    object.ctx = object.canvas.getContext('2d');
    return object;
  }
}
