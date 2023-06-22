class PixelDraw {
  constructor(container) {
    this.container = container;
    this.appendCanvas();

    this.pixelSize = 16;
    this.isPress = false;

    this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
    this.canvas.addEventListener('mouseup', e => this.handleMouseUp(e));
    this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e));

    this.drawGrid();
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.isPress = true;
  }

  handleMouseUp(e) {
    e.preventDefault();
    this.isPress = false;
  }

  handleMouseMove(e) {
    if (!this.isPress) return;

    const x = Math.floor((e.clientX - this.canvas.offsetLeft) / this.pixelSize);
    const y = Math.floor((e.clientY - this.canvas.offsetTop) / this.pixelSize);
    this.drawPixel(x, y);
  }

  drawPixel(x, y) {
    const size = this.pixelSize;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(x * size, y * size, size, size);
  }

  appendCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.container.append(this.canvas);
  }

  drawGrid() {
    const size = this.pixelSize;

    for (let y = 0; y < this.canvas.height; y += size) {
      for (let x = 0; x < this.canvas.width; x += size) {
        const isWhiteSquare =
          (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;

        this.ctx.fillStyle = isWhiteSquare ? '#ffffff' : '#cccccc';
        this.ctx.fillRect(x, y, size, size);
      }
    }
  }
}
