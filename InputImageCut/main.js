class InputImageCut {
  constructor(options) {
    if (!options || !options.container)
      throw new Error('InputImageCut constructor: missing arguments');

    this.container = options.container;

    // events manager
    this._eventHandlers = {};

    this.init();
  }

  init() {
    this.file = document.createElement('input');
    this.file.type = 'file';
    this.imageTexture = new Image();

    // canvas
    this.background = this.buildCanvas('background');
    this.filter = this.buildCanvas('filter');

    // start
    this.appendBanner();
    this.addEventsDefault();
  }

  drawBackground() {
    this.background.ctx.drawImage(
      this.imageTexture,
      0,
      0,
      this.imageTexture.width,
      this.imageTexture.height
    );
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

  appendCanvas() {
    this.clearContainer();
    this.container.append(this.background.canvas);
    this.container.append(this.background.filter);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  // handlers event
  handleOpenInputFile() {
    this.file.click();
  }

  handleSelectFile() {
    const file = this.file.files[0];
    if (!file) return;
    this.imageTexture.src = URL.createObjectURL(file);
  }

  handleUploadFile() {
    this.removeEventsDefault();
    this.appendCanvas();
    this.drawBackground();
  }

  // events pack
  addEventsDefault() {
    this.addListener(this.container, 'click', () => this.handleOpenInputFile());
    this.addListener(this.file, 'change', () => this.handleSelectFile());
    this.addListener(this.imageTexture, 'load', () => this.handleUploadFile());
  }

  removeEventsDefault() {
    this.removeListeners(this.container, 'click');
    this.removeListeners(this.file, 'change');
    this.removeListeners(this.imageTexture, 'load');
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
