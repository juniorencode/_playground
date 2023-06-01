class Chart {
  constructor(canvas, options) {
    this.parent = canvas.parentNode;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.title = options.title || '';
    this.labels = options.data.labels;
    this.datasets = options.data.datasets;

    // variables for mouse handling
    this.tooltipVisible = false;
    this.hoveredDatasetIndex = -1;
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
    this.sectionWidth = Math.floor(
      this.chart.width / this.datasets[0].data.length
    );
    const divider = this.datasets.length * 6 + this.datasets.length - 1 + 2;
    this.paddingSection = Math.ceil(this.sectionWidth / divider);
    this.barWidth =
      (this.sectionWidth - this.paddingSection * (this.datasets.length + 1)) /
      this.datasets.length;

    this.legendBox = {
      with: this.textHeight * 2,
      height: this.textHeight,
      gap: Math.floor(this.textHeight / 2)
    };

    // values
    this.numLabels = 10;

    while (this.chart.height / this.numLabels < 20) {
      if (this.chart.height / this.numLabels < 2) return;
      this.numLabels--;
    }

    const data = this.datasets.reduce((acc, set) => [...acc, ...set.data], []);
    this.maxValue = Math.max(...data);
    this.minValue = Math.min(...data);
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
    return this.ctx.measureText(
      Math.max(
        ...this.datasets.reduce(
          (acc, set) => [...acc, ...set.data.map(Math.abs)],
          []
        )
      )
    ).width;
  }

  calculateStadistic() {
    // adjust the minimum value if it is less than zero
    const adjustedMin = Math.min(0, this.minValue);
    const adjustedMax = Math.max(0, this.maxValue);

    // calculate the range of values
    this.range = adjustedMax - adjustedMin;

    // calculate the width of each interval
    this.calculateIntervalWidth();

    // round the range limits down and up
    this.roundedMin =
      Math.floor(adjustedMin / this.intervalWidth) * this.intervalWidth;
    this.roundedMax =
      Math.ceil(adjustedMax / this.intervalWidth) * this.intervalWidth;
    this.roundedRange = this.roundedMax - this.roundedMin;
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

  drawBox({ index, x, y, width, height, bottom, background }) {
    if (background) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      this.ctx.fillRect(x, y, width, height);
    }

    this.ctx.fillStyle = this.datasets[index].backgroundColor;
    this.ctx.strokeStyle = this.datasets[index].borderColor;
    this.ctx.lineWidth = this.datasets[index].borderWidth;

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

  drawCloud(x, y, width, direction) {
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
    this.ctx.beginPath();
    this.ctx.moveTo(x + this.tooltipCornerRadius, y);
    this.ctx.lineTo(x + width - this.tooltipCornerRadius, y);
    this.ctx.quadraticCurveTo(
      x + width,
      y,
      x + width,
      y + this.tooltipCornerRadius
    );
    this.ctx.lineTo(
      x + width,
      y + this.tooltipHeight - this.tooltipCornerRadius
    );
    this.ctx.quadraticCurveTo(
      x + width,
      y + this.tooltipHeight,
      x + width - this.tooltipCornerRadius,
      y + this.tooltipHeight
    );
    this.ctx.lineTo(x + this.tooltipCornerRadius, y + this.tooltipHeight);
    this.ctx.quadraticCurveTo(
      x,
      y + this.tooltipHeight,
      x,
      y + this.tooltipHeight - this.tooltipCornerRadius
    );
    this.ctx.lineTo(x, y + this.tooltipCornerRadius);
    this.ctx.quadraticCurveTo(x, y, x + this.tooltipCornerRadius, y);
    this.ctx.closePath();
    this.ctx.fill();

    // draw info arrow
    this.ctx.beginPath();
    this.ctx.moveTo(
      x + (direction === 'right' ? width : 0),
      y +
        this.tooltipHeight / 2 -
        this.tooltipSizeArrow / 2 -
        this.tooltipSizeArrow / 2
    );
    this.ctx.lineTo(
      x +
        (direction === 'right'
          ? width + this.tooltipSizeArrow
          : -this.tooltipSizeArrow),
      y + this.tooltipHeight / 2
    );
    this.ctx.lineTo(
      x + (direction === 'right' ? width : 0),
      y +
        this.tooltipHeight / 2 +
        this.tooltipSizeArrow / 2 +
        this.tooltipSizeArrow / 2
    );
    this.ctx.closePath();
    this.ctx.fill();
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
    this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
    const fullWidthLengend = this.datasets.reduce(
      (acc, set) =>
        acc +
        this.legendBox.with +
        this.legendBox.gap +
        this.ctx.measureText(set.label).width +
        this.legendBox.gap * 2,
      0 - this.legendBox.gap * 2
    );
    let x = (this.canvas.width - fullWidthLengend) / 2;

    this.datasets.map((set, index) => {
      const widthLengend =
        this.legendBox.with +
        this.legendBox.gap +
        this.ctx.measureText(set.label).width;

      // reference box
      this.drawBox({
        index,
        x,
        y:
          this.paddingTop / 2 -
          this.legendBox.height / 2 +
          (this.title ? this.sizeTitle : 0),
        width: this.legendBox.with,
        height: this.legendBox.height,
        bottom: true
      });

      this.drawText({
        title: set.label,
        x: x + this.legendBox.with + this.legendBox.gap,
        y:
          (this.title ? this.sizeTitle : 0) +
          this.paddingTop / 2 -
          Math.floor(this.textHeight / 2),
        align: 'left'
      });

      x += widthLengend + this.legendBox.gap * 2;
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
    this.datasets.map((set, i) => {
      set.data.map((data, j) => {
        const value = data;
        const origin =
          this.roundedMax * (this.chart.height / this.roundedRange);
        const x =
          j * this.sectionWidth +
          this.paddingSection +
          this.paddingLeft +
          i * (this.paddingSection + this.barWidth);
        const barHeight = value * (this.chart.height / this.roundedRange);
        const y =
          (this.title ? this.sizeTitle : 0) +
          this.paddingTop +
          origin -
          barHeight;

        this.drawBox({
          index: i,
          x,
          y,
          width: this.barWidth,
          height: barHeight
        });
      });
    });
  }

  drawTooltip() {
    if (
      !this.tooltipVisible ||
      this.hoveredDatasetIndex === -1 ||
      this.hoveredLabelIndex === -1
    )
      return;

    const label = this.labels[this.hoveredLabelIndex];
    const value =
      this.datasets[this.hoveredDatasetIndex].data[this.hoveredLabelIndex];
    const origin = this.roundedMax * (this.chart.height / this.roundedRange);
    const widthText = this.ctx.measureText(label + ': ' + value).width;
    const tooltipWidth = this.tooltipMargin * 3 + this.tooltipBox + widthText;
    const x =
      this.hoveredLabelIndex * this.sectionWidth +
      this.paddingSection +
      this.paddingLeft +
      this.hoveredDatasetIndex * (this.paddingSection + this.barWidth);
    const barHeight = value * (this.chart.height / this.roundedRange);
    const y =
      (this.title ? this.sizeTitle : 0) + this.paddingTop + origin - barHeight;

    let tooltipX;
    let arrowDirection;

    if (this.hoveredLabelIndex < Math.floor(this.labels.length / 2)) {
      tooltipX = x + this.barWidth - this.barWidth / 2 + this.tooltipSizeArrow;
      arrowDirection = 'left';
    } else {
      tooltipX = x - tooltipWidth + this.barWidth / 2;
      arrowDirection = 'right';
    }

    let tooltipY = y - this.tooltipHeight / 2;

    this.drawCloud(
      Math.ceil(tooltipX),
      Math.ceil(tooltipY),
      Math.ceil(tooltipWidth),
      arrowDirection
    );

    this.drawBox({
      index: this.hoveredDatasetIndex,
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
    this.datasets.map((set, i) => {
      set.data.map((value, j) => {
        const origin =
          this.roundedMax * (this.chart.height / this.roundedRange);
        const x =
          j * this.sectionWidth +
          this.paddingSection +
          this.paddingLeft +
          i * (this.paddingSection + this.barWidth);
        const barHeight =
          value *
          (this.chart.height / this.roundedRange) *
          (value < 0 ? -1 : 1);
        const y =
          (this.title ? this.sizeTitle : 0) +
          this.paddingTop +
          origin -
          (value < 0 ? 0 : barHeight);

        if (
          mousePos.x >= x &&
          mousePos.x <= x + this.barWidth &&
          mousePos.y >= y &&
          mousePos.y <= y + barHeight
        ) {
          this.hoveredDatasetIndex = i;
          this.hoveredLabelIndex = j;
          this.tooltipVisible = true;
        } else if (
          this.hoveredDatasetIndex === i &&
          this.hoveredLabelIndex === j
        ) {
          this.hoveredDatasetIndex = -1;
          this.hoveredLabelIndex = -1;
          this.tooltipVisible = false;
        }
      });
    });

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
