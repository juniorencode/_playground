class PixelDraw {
  constructor(container) {
    this.container = container;

    this.pixelSize = 10;
    this.gridUnitSize = 10;
    this.color = '#000';
    this.isPress = false;

    this.appendTools();
    this.appendCanvas();

    this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
    this.canvas.addEventListener('mouseup', e => this.handleMouseUp(e));
    this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', e => this.handleMouseLeave(e));

    this.drawGrid();
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.isPress = true;
    this.motion(e);
  }

  handleMouseUp(e) {
    e.preventDefault();
    this.isPress = false;
  }

  handleMouseMove(e) {
    e.preventDefault();
    // this.motionPencil(e);
    this.motion(e);
  }

  handleMouseLeave(e) {
    e.preventDefault();
    this.isPress = false;
  }

  handleSetColor(e) {
    this.color = e.target.value;
  }

  handleSetSize(e) {
    this.pixelSize = e.target.value * this.gridUnitSize;
  }

  motionPencil(e) {
    this.clearCanvas();
    const x = Math.floor(
      (e.clientX - this.canvas.offsetLeft) / this.gridUnitSize
    );
    const y = Math.floor(
      (e.clientY - this.canvas.offsetTop) / this.gridUnitSize
    );

    this.drawPencil(x, y);
  }

  motion(e) {
    if (!this.isPress) return;
    const x = Math.floor(
      (e.clientX - this.canvas.offsetLeft) / this.gridUnitSize
    );
    const y = Math.floor(
      (e.clientY - this.canvas.offsetTop) / this.gridUnitSize
    );

    this.drawPixel(x, y);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
  }

  appendTools() {
    const div = document.createElement('div');
    const width = document.createElement('div');
    const labelWidth = document.createElement('label');
    const inputWidth = document.createElement('input');
    const color = document.createElement('div');
    const labelColor = document.createElement('label');
    const inputColor = document.createElement('input');
    div.classList.add('PixelDraw__tools');
    width.classList.add('PixelDraw__width');
    labelWidth.innerText = 'Line: ';
    inputWidth.type = 'number';
    inputWidth.value = this.pixelSize / this.gridUnitSize;
    inputWidth.addEventListener('input', e => this.handleSetSize(e));
    color.classList.add('PixelDraw__color');
    labelColor.innerText = 'Color: ';
    inputColor.type = 'color';
    inputColor.addEventListener('input', e => this.handleSetColor(e));
    width.append(labelWidth);
    width.append(inputWidth);
    color.append(labelColor);
    color.append(inputColor);
    div.append(width);
    div.append(color);
    this.container.append(div);
  }

  appendCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.classList.add('PixelDraw__canvas');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.container.append(this.canvas);
  }

  drawGrid() {
    const size = this.gridUnitSize;

    for (let y = 0; y < this.canvas.height; y += size) {
      for (let x = 0; x < this.canvas.width; x += size) {
        const isWhiteSquare =
          (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;

        this.ctx.fillStyle = isWhiteSquare ? '#ffffff' : '#cccccc';
        this.ctx.fillRect(x, y, size, size);
      }
    }
  }

  drawPixel(x, y) {
    const size = this.pixelSize;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x * this.gridUnitSize, y * this.gridUnitSize, size, size);
  }

  drawPencil(x, y) {
    const size = this.pixelSize;
    this.ctx.strokeStyle = '#000';
    this.ctx.strokeRect(
      x * this.gridUnitSize,
      y * this.gridUnitSize,
      size,
      size
    );
  }
}
