class Chart {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.ratio = { w: 2, h: 1 };
    this.labels = options.data.labels;
    this.data = options.data.datasets[0].data;

    this.maxValue = Math.max(...this.data);
    this.minValue = Math.min(...this.data);
    this.numLabels = 10;
    this.range = 0;
    this.calculateStadistic();

    this.paddingLeft = 40;
    this.paddingTop = 50;
    this.paddingBottom = 40;
    this.paddingSection = 5;

    // normalize size
    this.canvas.width = this.canvas.parentNode.clientWidth;
    this.canvas.height = this.canvas.width / 2;

    // chart
    this.chart = {
      width: this.canvas.width - this.paddingLeft,
      height: this.canvas.height - this.paddingTop - this.paddingBottom
    };

    // bar
    this.sectionWidth = Math.floor(this.chart.width / this.data.length);
    this.barWidth = this.sectionWidth - this.paddingSection * 2;

    this.drawGrid();
  }

  calculateStadistic() {
    // adjust the minimum value if it is less than zero
    const adjustedMin = Math.min(0, this.minValue);

    // // calculate the range of values
    this.range = this.maxValue - adjustedMin;

    // // calculate the width of each interval
    this.calculateIntervalWidth();

    // // round the range limits down and up
    this.roundedMin =
      Math.floor(adjustedMin / this.intervalWidth) * this.intervalWidth;
    this.roundedMax =
      Math.ceil(this.maxValue / this.intervalWidth) * this.intervalWidth;
  }

  calculateIntervalWidth() {
    this.intervalWidth = Math.ceil(this.range / this.numLabels);
    const multiple = this.nearestPowerOfTen(this.intervalWidth);

    while (this.intervalWidth % multiple !== 0) {
      this.intervalWidth++;
    }
  }

  nearestPowerOfTen(number) {
    const log = Math.floor(Math.log10(number)); // calculate the logarithm base 10
    const powerOfTen = Math.pow(10, log); // calculate the power of ten

    return powerOfTen;
  }

  drawGrid() {
    this.drawHorizontalLines();
  }

  drawHorizontalLines() {
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 0.2;

    for (
      let value = this.roundedMin;
      value <= this.roundedMax;
      value += this.intervalWidth
    ) {
      const y =
        this.chart.height -
        ((value - this.roundedMin) / (this.roundedMax - this.roundedMin)) *
          this.chart.height +
        this.paddingTop;

      this.ctx.beginPath();
      this.ctx.moveTo(this.paddingLeft, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }
}
