class InputImageCut {
  constructor(options) {
    if (!options || !options.container)
      throw new Error('InputImageCut constructor: missing arguments');

    this.container = options.container;

    this.resultImage = {
      width: 500,
      height: 500
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
      position: { x: 0, y: 0 },
      temp: { x: 0, y: 0 },
      size: { width: 0, height: 0 }
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
    this.background.canvas.width = this.resultImage.width * 2;
    this.background.canvas.height = this.resultImage.height * 1.2;
    this.filter = this.buildCanvas('filter');
    this.filter.canvas.width = this.background.canvas.width;
    this.filter.canvas.height = this.background.canvas.height;

    // start
    this.appendWatermark(this.watermarks.default);
    this.addEventsDefault();
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

  doCalculateMove(relativeX, relativeY) {
    const x = relativeX - this.image.temp.x;
    const y = relativeY - this.image.temp.y;
    this.doCalculatePosition(x, y);
  }

  doCalculatePosition(x, y) {
    const { canvas } = this.filter;
    const { width, height } = this.image.size;
    const { width: resultWidth, height: resultHeight } = this.resultImage;
    const halfHorizontal = (canvas.width - this.resultImage.width) / 2;
    const halfVertical = (canvas.height - this.resultImage.height) / 2;

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
    const { width, height } = this.filter.canvas;
    const { width: resultWidth } = this.resultImage;
    const region = new Path2D();

    region.rect(0, 0, width, height);
    region.arc(
      width / 2,
      height / 2,
      (width * resultWidth) / width / 2,
      0,
      2 * Math.PI
    );
    this.filter.ctx.clip(region, 'evenodd');
    this.filter.ctx.fillStyle = 'rgba(255, 255, 255, .8)';
    this.filter.ctx.rect(0, 0, width, height);
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
    this.container.append(watermark);
  }

  appendCloseButton() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.classList.add('InputImageCut__close');
    icon.classList.add('fas', 'fa-times');
    button.append(icon);
    this.btnClose = button;
    this.container.append(button);
  }

  appendCanvas() {
    this.clearContainer();
    this.container.append(this.background.canvas);
    this.container.append(this.filter.canvas);
  }

  // clear and reset
  clearContainer() {
    this.container.innerHTML = '';
  }

  clearBackground() {
    const { canvas, ctx } = this.background;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  reset() {
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
    this.appendCanvas();
    this.appendCloseButton();
    this.addEventsFilter();

    // draw
    this.drawBackground();
    this.drawFilter();
  }

  handleDragEnter(e) {
    e.preventDefault();
    this.clearContainer();
    this.appendWatermark(this.watermarks.drop);
    this.container.classList.add('InputImageCut--dragover');
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.clearContainer();
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
    this.mouseDown = true;

    this.image.temp.x = e.offsetX - this.image.position.x;
    this.image.temp.y = e.offsetY - this.image.position.y;
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
    const { clientWidth, clientHeight } = canvas;

    if (
      relativeX <= 0 ||
      relativeX >= clientWidth ||
      relativeY <= 0 ||
      relativeY >= clientHeight
    ) {
      this.mouseDown = false;
      return;
    }

    this.doCalculateMove(relativeX, relativeY);
    this.drawBackground();
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
    this.addListener(canvas, 'mousemove', e => this.handleMouseMove(e));
    this.addListener(this.btnClose, 'click', () => this.reset());
  }

  removeEventsDefault() {
    this.removeListeners(this.container, 'click');
    this.removeListeners(this.container, 'dragenter');
    this.removeListeners(this.container, 'dragleave');
    this.removeListeners(this.container, 'dragover');
    this.removeListeners(this.container, 'drop');
    this.removeListeners(this.file, 'change');
    this.removeListeners(this.image.file, 'load');
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
