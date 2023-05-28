class Chart {
  constructor(canvas, options) {
    this.parent = canvas.parentNode;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.title = options.title || '';
    this.labels = options.data.labels;
    this.data = options.data.datasets[0].data;

    // legend box
    this.lengend = options.data.datasets[0].label;

    // variables for mouse handling
    this.tooltipVisible = false;
    this.hoveredLabelIndex = -1;

    this.initial();
    this.draw();

    window.addEventListener('resize', () => this.resize());
    canvas.addEventListener('mousemove', e => this.handleMouseMove(e));
  }

  initial() {
    // normalize size
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.width / 2;

    this.rect = this.canvas.getBoundingClientRect();
    this.ratio = window.devicePixelRatio;
    this.auxRatio = this.ratio;

    // Default values
    this.fontSize = 12;
    this.fontFamily = 'sans-serif';
    this.textHeight = this.calculateTextSize();

    this.padding = 10;

    this.sizeTitle = this.textHeight + this.padding * 2;
    this.paddingTop = this.textHeight + this.padding * 2;
    this.paddingBottom = this.textHeight + this.padding * 2;
    this.paddingLeft = this.calculateWidthAxisY() + this.padding * 2;

    this.tooltipMargin = this.padding;
    this.tooltipHeight = this.textHeight + this.tooltipMargin * 2;
    this.tooltipCornerRadius = this.padding / 2;
    this.tooltipBox = this.textHeight;
    this.tooltipSizeArrow = Math.floor(this.tooltipHeight / 4);

    this.angleLabels = 0;

    // Responsive values
    if (this.canvas.width < 450) {
      this.angleLabels = Math.PI / 4;
      this.paddingBottom = this.paddingBottom * 2;
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
    this.paddingSection = Math.ceil(this.sectionWidth / 8);
    this.barWidth = this.sectionWidth - this.paddingSection * 2;

    this.legendBox = {
      with: this.textHeight * 2,
      height: this.textHeight,
      margin: Math.floor(this.textHeight / 2)
    };

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
  }

  calculateTextSize() {
    this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
    const textMetrics = this.ctx.measureText('Ag');
    return (
      textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
    );
  }

  calculateWidthAxisY() {
    this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
    return this.ctx.measureText(Math.max(...this.data.map(Math.abs))).width;
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
    this.clearCanvas();

    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 0.1;
    this.drawHorizontalLines();
    this.drawVerticalLines();

    this.drawAxisX();
    this.drawAxisY();

    if (this.title) this.drawTitle();

    this.drawBars();
    this.drawLegend();

    this.drawTooltip();
  }

  drawText({ title, x, y, bold, align, baseline, color }) {
    bold = !!bold;
    align = align || 'center';
    baseline = baseline || 'top';
    color = color || 'rgb(62, 62, 62)';
    this.ctx.fillStyle = color;
    this.ctx.font = (bold && 'bold ') + this.fontSize + 'px ' + this.fontFamily;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;

    this.ctx.fillText(title, x, y);
  }

  drawBox({ x, y, width, height, bottom, background }) {
    if (background) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      this.ctx.fillRect(x, y, width, height);
    }

    this.ctx.fillStyle = 'rgba(132, 132, 132, 0.2)';
    this.ctx.strokeStyle = 'rgba(132, 132, 132, 1)';
    this.ctx.lineWidth = 2;

    this.ctx.fillRect(x, y, width, height);
    if (!bottom) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + height);
      this.ctx.lineTo(x, y);
      this.ctx.lineTo(x + width, y);
      this.ctx.lineTo(x + width, y + height);
      this.ctx.stroke();
    } else {
      this.ctx.strokeRect(x, y, width, height);
    }
  }

  drawTitle() {
    this.drawText({
      title: this.title,
      x: this.canvas.width / 2,
      y: this.sizeTitle / 2,
      bold: true
    });
  }

  drawLegend() {
    const widthLengend =
      this.ctx.measureText(this.lengend).width +
      this.legendBox.with +
      this.legendBox.margin;

    // reference box
    this.drawBox({
      x: this.canvas.width / 2 - widthLengend / 2,
      y:
        this.paddingTop / 2 -
        this.legendBox.height / 2 +
        (this.title ? this.sizeTitle : 0),
      width: this.legendBox.with,
      height: this.legendBox.height,
      bottom: true
    });

    this.drawText({
      title: this.lengend,
      x:
        this.canvas.width / 2 + this.legendBox.with / 2 + this.legendBox.margin,
      y:
        (this.title ? this.sizeTitle : 0) +
        this.paddingTop / 2 -
        Math.floor(this.textHeight / 2)
    });
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
      this.ctx.translate(
        sectionCenterX,
        this.canvas.height - this.paddingBottom / 2
      );
      this.ctx.rotate(-this.angleLabels);
      this.drawText({ title: label, x: 0, y: 0 });
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

      this.drawText({
        title: value,
        x: this.paddingLeft - 15,
        y,
        align: 'right',
        baseline: 'middle'
      });
    }
  }

  drawBars() {
    for (let i = 0; i < this.data.length; i++) {
      const value = this.data[i];
      const barheight = (value / this.roundedMax) * this.chart.height;
      const x = i * this.sectionWidth + this.paddingSection + this.paddingLeft;
      const y =
        this.chart.height -
        barheight +
        this.paddingTop +
        (this.title ? this.sizeTitle : 0);

      this.drawBox({ x, y, width: this.barWidth, height: barheight });
    }
  }

  drawTooltip() {
    if (!this.tooltipVisible || this.hoveredLabelIndex === -1) return;

    const label = this.labels[this.hoveredLabelIndex];
    const value = this.data[this.hoveredLabelIndex];
    const widthText = this.ctx.measureText(label + ': ' + value).width;
    const tooltipWidth = this.tooltipMargin * 3 + this.tooltipBox + widthText;
    const barHeight = (value / this.roundedMax) * this.chart.height;
    const x =
      this.hoveredLabelIndex * this.sectionWidth +
      this.paddingSection +
      this.paddingLeft;
    const y =
      this.chart.height -
      barHeight +
      this.paddingTop +
      (this.title ? this.sizeTitle : 0);

    let tooltipX;
    let arrowDirection;

    if (this.hoveredLabelIndex < Math.floor(this.labels.length / 2)) {
      tooltipX = x + this.barWidth - this.barWidth / 2 + this.tooltipSizeArrow;
      arrowDirection = 'left';
    } else {
      tooltipX = x - tooltipWidth + this.barWidth / 2;
      arrowDirection = 'right';
    }

    const tooltipY = y - this.tooltipHeight / 2;

    this.ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
    this.ctx.beginPath();
    this.ctx.moveTo(tooltipX + this.tooltipCornerRadius, tooltipY);
    this.ctx.lineTo(
      tooltipX + tooltipWidth - this.tooltipCornerRadius,
      tooltipY
    );
    this.ctx.quadraticCurveTo(
      tooltipX + tooltipWidth,
      tooltipY,
      tooltipX + tooltipWidth,
      tooltipY + this.tooltipCornerRadius
    );
    this.ctx.lineTo(
      tooltipX + tooltipWidth,
      tooltipY + this.tooltipHeight - this.tooltipCornerRadius
    );
    this.ctx.quadraticCurveTo(
      tooltipX + tooltipWidth,
      tooltipY + this.tooltipHeight,
      tooltipX + tooltipWidth - this.tooltipCornerRadius,
      tooltipY + this.tooltipHeight
    );
    this.ctx.lineTo(
      tooltipX + this.tooltipCornerRadius,
      tooltipY + this.tooltipHeight
    );
    this.ctx.quadraticCurveTo(
      tooltipX,
      tooltipY + this.tooltipHeight,
      tooltipX,
      tooltipY + this.tooltipHeight - this.tooltipCornerRadius
    );
    this.ctx.lineTo(tooltipX, tooltipY + this.tooltipCornerRadius);
    this.ctx.quadraticCurveTo(
      tooltipX,
      tooltipY,
      tooltipX + this.tooltipCornerRadius,
      tooltipY
    );
    this.ctx.closePath();
    this.ctx.fill();

    // draw info arrow
    this.ctx.beginPath();
    if (arrowDirection === 'left') {
      this.ctx.moveTo(
        tooltipX,
        tooltipY +
          this.tooltipHeight / 2 -
          this.tooltipSizeArrow / 2 -
          this.tooltipSizeArrow / 2
      );
      this.ctx.lineTo(
        tooltipX - this.tooltipSizeArrow,
        tooltipY + this.tooltipHeight / 2
      );
      this.ctx.lineTo(
        tooltipX,
        tooltipY +
          this.tooltipHeight / 2 +
          this.tooltipSizeArrow / 2 +
          this.tooltipSizeArrow / 2
      );
    } else {
      this.ctx.moveTo(
        tooltipX + tooltipWidth,
        tooltipY +
          this.tooltipHeight / 2 -
          this.tooltipSizeArrow / 2 -
          this.tooltipSizeArrow / 2
      );
      this.ctx.lineTo(
        tooltipX + tooltipWidth + this.tooltipSizeArrow,
        tooltipY + this.tooltipHeight / 2
      );
      this.ctx.lineTo(
        tooltipX + tooltipWidth,
        tooltipY +
          this.tooltipHeight / 2 +
          this.tooltipSizeArrow / 2 +
          this.tooltipSizeArrow / 2
      );
    }
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
    this.ctx.fill();

    this.drawBox({
      x: tooltipX + this.tooltipMargin,
      y: tooltipY + this.tooltipMargin,
      width: this.tooltipBox,
      height: this.tooltipBox,
      bottom: true,
      background: true
    });

    this.drawText({
      title: label + ': ' + value,
      x: tooltipX + this.tooltipMargin * 2 + this.tooltipBox,
      y: tooltipY + this.tooltipHeight / 2 - Math.floor(this.textHeight / 2),
      align: 'left',
      color: '#fff'
    });
  }

  resize() {
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

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleMouseMove(e) {
    const mousePos = this.getMousePos(e);

    // check if the mouse pointer is over a bar
    for (let i = 0; i < this.data.length; i++) {
      const value = this.data[i];
      const barHeight = (value / this.roundedMax) * this.chart.height;
      const x = i * this.sectionWidth + this.paddingSection + this.paddingLeft;
      const y =
        this.chart.height -
        barHeight +
        this.paddingTop +
        (this.title ? this.sizeTitle : 0);

      if (
        mousePos.x >= x &&
        mousePos.x <= x + this.barWidth &&
        mousePos.y >= y &&
        mousePos.y <= y + barHeight
      ) {
        this.hoveredLabelIndex = i;
        this.tooltipVisible = true;
      } else if (this.hoveredLabelIndex === i) {
        this.hoveredLabelIndex = -1;
        this.tooltipVisible = false;
      }
    }

    this.draw();
  }

  // get the coordinates of the mouse relative to the canvas
  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}
