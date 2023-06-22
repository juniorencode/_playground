class PixelDraw {
  constructor(container) {
    this.container = container;
    this.appendCanvas();

    this.pixelSize = 16;

    this.drawGrid();
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
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';

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
