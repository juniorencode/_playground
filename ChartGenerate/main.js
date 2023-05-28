class Chart {
  constructor(canvas, options) {
    this.parent = canvas.parentNode;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.title = options.title || '';
    this.labels = options.data.labels;
    this.data = options.data.datasets[0].data;

    this.sizeTitle = 24;
    this.paddingTop = 42;
    this.paddingBottom = 24;
    this.paddingLeft = 36;
    this.paddingSection = 12;

    // legend box
    this.legendBox = {
      with: 24,
      height: 12,
      margin: 4
    };

    this.initial();
    this.draw();

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  initial() {
    // normalize size
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.width / 2;

    this.rect = this.canvas.getBoundingClientRect();
    this.ratio = window.devicePixelRatio;
    this.auxRatio = this.ratio;

    // Default values
    this.sizeTitle = 24;
    this.paddingTop = 42;
    this.paddingBottom = 24;
    this.paddingLeft = 36;
    this.paddingSection = 12;
    this.angleLabels = 0;

    // Responsive values
    if (this.canvas.width < 450) {
      this.sizeTitle = 12;
      this.paddingTop = 32;
      this.paddingBottom = 42;
      this.paddingSection = 6;
      this.angleLabels = Math.PI / 4;
    }

    // chart
    this.chart = {
      width: this.canvas.width - this.paddingLeft,
      height:
        this.canvas.height -
        this.paddingTop -
        this.paddingBottom -
        (this.title ? this.sizeTitle : 0)
    };

    // bar
    this.sectionWidth = Math.floor(this.chart.width / this.data.length);
    this.barWidth = this.sectionWidth - this.paddingSection * 2;

    // values
    this.numLabels = 10;

    while (this.chart.height / this.numLabels < 20) {
      if (this.chart.height / this.numLabels < 2) return;
      this.numLabels--;
    }

    this.maxValue = Math.max(...this.data);
    this.minValue = Math.min(...this.data);
    this.range = 0;
    this.calculateStadistic();

    // console.log(this.chart.width);
  }

  calculateStadistic() {
    // adjust the minimum value if it is less than zero
    const adjustedMin = Math.min(0, this.minValue);

    // calculate the range of values
    this.range = this.maxValue - adjustedMin;

    // calculate the width of each interval
    this.calculateIntervalWidth();

    // round the range limits down and up
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

  draw() {
    if (this.title) this.drawTitle();

    this.ctx.font = '12px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.drawLegend();

    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 0.1;

    this.drawHorizontalLines();
    this.drawVerticalLines();
    this.drawAxisX();
    this.drawAxisY();

    this.drawBars();
  }

  drawTitle() {
    this.ctx.fillStyle = 'rgb(62, 62, 62)';
    this.ctx.font = 'bold 12px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    this.ctx.fillText(this.title, this.canvas.width / 2, this.sizeTitle / 2);
  }

  drawLegend() {
    this.ctx.fillStyle = 'rgba(132, 132, 132, 0.2)';
    this.ctx.strokeStyle = 'rgba(132, 132, 132, 1)';
    this.ctx.lineWidth = 2;

    const widthLengend =
      this.ctx.measureText('# numbers of Votes').width +
      this.legendBox.with +
      this.legendBox.margin;

    this.ctx.fillRect(
      this.canvas.width / 2 - widthLengend / 2,
      this.paddingTop / 2 -
        this.legendBox.height / 2 +
        (this.title ? this.sizeTitle : 0),
      this.legendBox.with,
      this.legendBox.height
    );
    this.ctx.strokeRect(
      this.canvas.width / 2 - widthLengend / 2,
      this.paddingTop / 2 -
        this.legendBox.height / 2 +
        (this.title ? this.sizeTitle : 0),
      this.legendBox.with,
      this.legendBox.height
    );

    this.ctx.fillStyle = 'rgb(62, 62, 62)';
    this.ctx.fillText(
      '# numbers of Votes',
      this.canvas.width / 2 + this.legendBox.with / 2 + this.legendBox.margin,
      this.paddingTop / 2 + (this.title ? this.sizeTitle : 0)
    );
  }

  drawHorizontalLines() {
    for (
      let value = this.roundedMin;
      value <= this.roundedMax;
      value += this.intervalWidth
    ) {
      const y =
        this.chart.height -
        ((value - this.roundedMin) / (this.roundedMax - this.roundedMin)) *
          this.chart.height +
        this.paddingTop +
        (this.title ? this.sizeTitle : 0);

      this.ctx.beginPath();
      this.ctx.moveTo(this.paddingLeft - 10, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  drawVerticalLines() {
    for (let i = 0; i < this.labels.length; i++) {
      const x = i * this.sectionWidth + this.paddingLeft;

      this.ctx.beginPath();
      this.ctx.moveTo(x, this.paddingTop + (this.title ? this.sizeTitle : 0));
      this.ctx.lineTo(x, this.canvas.height - this.paddingBottom + 10);
      this.ctx.stroke();
    }
  }

  drawAxisX() {
    for (let i = 0; i < this.labels.length; i++) {
      const x = i * this.sectionWidth + this.paddingLeft;

      const label = this.labels[i];
      const sectionCenterX = x + this.sectionWidth / 2;

      this.ctx.save();
      this.ctx.fillStyle = 'rgb(62, 62, 62)';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'top';
      this.ctx.font = '12px sans-serif';
      this.ctx.translate(
        sectionCenterX,
        this.canvas.height - this.paddingBottom / 2
      );
      this.ctx.rotate(-this.angleLabels);
      this.ctx.fillText(label, 0, 0);
      this.ctx.rotate(this.angleLabels);
      this.ctx.restore();
    }
  }

  drawAxisY() {
    for (
      let value = this.roundedMin;
      value <= this.roundedMax;
      value += this.intervalWidth
    ) {
      const y =
        this.chart.height -
        ((value - this.roundedMin) / (this.roundedMax - this.roundedMin)) *
          this.chart.height +
        this.paddingTop +
        (this.title ? this.sizeTitle : 0);

      this.ctx.fillStyle = 'rgb(62, 62, 62)';
      this.ctx.textAlign = 'right';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = '12px sans-serif';

      this.ctx.fillText(value, this.paddingLeft - 15, y);
    }
  }

  drawBars() {
    this.ctx.fillStyle = 'rgba(132, 132, 132, 0.2)';
    this.ctx.strokeStyle = 'rgba(132, 132, 132, 1)';
    this.ctx.lineWidth = 2;

    for (let i = 0; i < this.data.length; i++) {
      const value = this.data[i];
      const barheight = (value / this.roundedMax) * this.chart.height;
      const x = i * this.sectionWidth + this.paddingSection + this.paddingLeft;
      const y =
        this.chart.height -
        barheight +
        this.paddingTop +
        (this.title ? this.sizeTitle : 0);

      this.ctx.fillRect(x, y, this.barWidth, barheight);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + barheight);
      this.ctx.lineTo(x, y);
      this.ctx.lineTo(x + this.barWidth, y);
      this.ctx.lineTo(x + this.barWidth, y + barheight);
      this.ctx.stroke();
    }
  }

  resize() {
    this.cleanCanvas();

    const ratio = window.devicePixelRatio;

    if (this.auxRatio !== ratio) {
      this.canvas.style.width = this.rect.width / ratio + 'px';
      this.canvas.style.height = this.rect.height / ratio + 'px';
      this.auxRatio = ratio;
    } else {
      this.canvas.removeAttribute('style');
      this.initial();
    }

    this.draw();
  }

  cleanCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
