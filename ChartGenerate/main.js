class Chart {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ratio = { w: 2, h: 1 };

    // normalize size
    this.canvas.width = this.canvas.parentNode.clientWidth;
    this.canvas.height = this.canvas.width / 2;

    console.log(this.canvas.width);
    console.log(this.canvas.height);
  }
}
