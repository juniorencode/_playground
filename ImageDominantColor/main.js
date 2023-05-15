class ImageDominantColor {
  constructor(image, box) {
    this.image = image;
    this.box = box;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.data = null;
    this.length = 0;
    this.color = { r: 0, g: 0, b: 0 }; // initial color
    this.ratio = 10; // information jumps

    // check if the image has finished loading
    if (this.image.complete) {
      this.initial();
    } else {
      this.image.addEventListener('load', () => {
        this.initial();
      });
    }
  }

  initial() {
    this.width = this.canvas.width = this.image.width;
    this.height = this.canvas.height = this.image.height;

    this.extractData();
  }

  extractData() {
    // capture pixel information
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    this.data = this.ctx.getImageData(0, 0, this.width, this.height);
    this.length = this.data.data.length;
  }

  extractColor() {
    // number of channels is 4
    let i = -4;
    let count = this.length / (this.ratio * 4); // total number of information used

    // sum of numbers per channel
    while ((i += this.ratio * 4) < this.length) {
      this.color.r += this.data.data[i];
      this.color.g += this.data.data[i + 1];
      this.color.b += this.data.data[i + 2];
    }

    // averaging the values per channel
    this.color.r = Math.floor(this.color.r / count);
    this.color.g = Math.floor(this.color.g / count);
    this.color.b = Math.floor(this.color.b / count);
  }

  paintBox() {
    // apply background color to the box
    this.box.style.background = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
  }
}
