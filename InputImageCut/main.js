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
      size: { width: 0, height: 0 }
    };

    // canvas
    this.background = this.buildCanvas('background');
    this.background.canvas.width = this.resultImage.width * 2;
    this.background.canvas.height = this.resultImage.height * 1.2;
    this.filter = this.buildCanvas('filter');
    this.filter.canvas.width = this.background.canvas.width;
    this.filter.canvas.height = this.background.canvas.height;

    // start
    this.appendBanner();
    this.addEventsDefault();
  }

  drawBackground() {
    const { file, size, position } = this.image;
    const { width, height } = file;

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

  appendBanner() {
    const banner = document.createElement('div');
    const icon = document.createElement('i');
    const paragraph = document.createElement('p');
    const text = document.createTextNode(
      'Drop your photo here or browse your computer'
    );
    banner.classList.add('InputImageCut__banner');
    icon.classList.add('far', 'fa-image');
    paragraph.append(text);
    banner.append(icon);
    banner.append(paragraph);
    this.container.append(banner);
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

  clearContainer() {
    this.container.innerHTML = '';
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
    const file = this.file.files[0];
    if (!file) return;
    this.image.file.src = URL.createObjectURL(file);
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

  // events pack
  addEventsDefault() {
    this.addListener(this.container, 'click', () => this.handleOpenInputFile());
    this.addListener(this.file, 'change', () => this.handleSelectFile());
    this.addListener(this.image.file, 'load', () => this.handleUploadFile());
  }

  addEventsFilter() {
    this.addListener(this.btnClose, 'click', () => this.reset());
  }

  removeEventsDefault() {
    this.removeListeners(this.container, 'click');
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
