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
  }

  calculateStadistic() {
    // adjust the minimum value if it is less than zero
    const adjustedMin = Math.min(0, this.minValue);

    // // calculate the range of values
    this.range = this.maxValue - adjustedMin;

    // // calculate the width of each interval
    this.intervalWidth = this.calculateIntervalWidth(
      this.range,
      this.numLabels
    );
    console.log(this.intervalWidth);

    // // round the range limits down and up
    this.roundedMin =
      Math.floor(adjustedMin / this.intervalWidth) * this.intervalWidth;
    this.roundedMax =
      Math.ceil(this.maxValue / this.intervalWidth) * this.intervalWidth;
  }

  calculateIntervalWidth(range, numLabels) {
    const intervalWidth = Math.ceil(range / numLabels);
    const multiple = this.nearestPowerOfTen(intervalWidth);
    let newIntervalWidth = intervalWidth;

    while (newIntervalWidth % multiple !== 0) {
      newIntervalWidth++;
    }

    return newIntervalWidth;
  }

  nearestPowerOfTen(number) {
    const log = Math.floor(Math.log10(number)); // calculate the logarithm base 10
    const powerOfTen = Math.pow(10, log); // calculate the power of ten

    return powerOfTen;
  }
}
