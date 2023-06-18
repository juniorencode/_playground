class InputImageCut {
  constructor(container) {
    this.container = container;
    this.file = document.createElement('input');
    this.file.type = 'file';
    this.imageTexture = new Image();

    // canvas
    this.backgroundCanvas = null;
    this.filterCanvas = null;

    this.appendBanner();
    // this.container.addEventListener('click', () => this.handleOpenInputFile());
    // this.file.addEventListener('change', () => this.handleSelectFile());
    // this.imageTexture.addEventListener('load', () => this.handleUploadFile());

    this._eventHandlers = [];
  }

  handleOpenInputFile() {
    this.file.click();
  }

  handleSelectFile() {
    this.imageTexture.src = URL.createObjectURL(this.file.files[0]);
  }

  handleUploadFile() {
    this.container.innerHTML = '';
    this.appendBackgroundCanvas();
    this.appendFilterCanvas();
    this.drawBackground();
  }

  drawBackground() {
    const ctx = this.backgroundCanvas.getContext('2d');
    ctx.drawImage(
      this.imageTexture,
      0,
      0,
      this.imageTexture.width,
      this.imageTexture.height
    );
  }

  appendBackgroundCanvas() {
    this.backgroundCanvas = document.createElement('canvas');
    this.backgroundCanvas.classList.add('InputImageCut__background');
    this.container.append(this.backgroundCanvas);
  }

  appendFilterCanvas() {
    this.filterCanvas = document.createElement('canvas');
    this.filterCanvas.classList.add('InputImageCut__filter');
    this.container.append(this.filterCanvas);
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

  // event manager
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
}
