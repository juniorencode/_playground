class ImageColorPicker {
  constructor(image) {
    this.image = image;
    this.position = null;
    this.data = null;
    this.dim = 9;
    this.middle = Math.floor(this.dim / 2);
    this.tile = 12;
    this.size = (this.dim - 1) * this.tile + (this.dim - 1);
    this.content = document.createElement('div');
    this.grid = null;

    this.inside = false;

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
    // detects mouse movement for color grid update
    window.addEventListener('mousemove', e => {
      this.move(e);
    });

    // detect when screen is resized
    window.addEventListener('resize', e => {
      this.resize();
    });

    this.resize();

    // applying inline styles to the color grid container
    this.content.style.width = `${this.size}px`;
    this.content.style.height = `${this.size}px`;
    this.content.style.borderRadius = `${this.size / 2}px`;
    this.content.style.border = 'solid 1px #000';
    this.content.style.position = 'absolute';
    this.content.style.background = '#fff';
    this.content.style.overflow = 'hidden';
    this.content.style.cursor = 'none';

    // canvas for extracting information from image pixels
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.image.width;
    canvas.height = this.image.height;
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    this.data = ctx.getImageData(
      0,
      0,
      this.image.width,
      this.image.height
    ).data;

    // canvas to draw the color grid
    const canvasGrid = document.createElement('canvas');
    this.grid = canvasGrid.getContext('2d');
    canvasGrid.width = this.size;
    canvasGrid.height = this.size;
    canvasGrid.style.cursor = 'none';
    canvasGrid.style.userSelect = 'none';

    // insert the grid inside the container
    this.content.append(canvasGrid);
  }

  start() {
    // insert zoom inside the DOM
    // update the state of the variable inside to true
    if (this.inside) return;
    document.body.append(this.content);
    this.inside = true;
  }

  end() {
    // remove "ColorPicker" inside the DOM
    // update the state of the variable inside to false
    if (!this.inside) return;
    this.content.remove();
    this.inside = false;
  }

  resize() {
    // obj: position local
    this.position = this.image.getBoundingClientRect();
  }

  move(e) {
    if (this.isInside(e.pageX, e.pageY)) {
      if (!this.inside) this.start();

      //reposition the "ColorPicker" to the center with reference to the mouse position
      this.content.style.top = `${Math.floor(e.pageY - this.size / 2) - 4}px`;
      this.content.style.left = `${Math.floor(e.pageX - this.size / 2) - 4}px`;

      // paint the color grid of the "ColorPicker"
      this.paintGrid(
        Math.floor(e.pageX - this.position.x),
        Math.floor(e.pageY - this.position.y)
      );
    } else {
      if (!this.inside) return;
      this.end();
    }
  }

  isInside(x, y) {
    // check that the mouse is inside the image
    return (
      this.position.left <= x &&
      x < this.position.right &&
      this.position.top <= y &&
      y < this.position.bottom
    );
  }

  paintGrid(x, y) {
    // clean canvas
    this.grid.clearRect(0, 0, this.image.width, this.image.height);

    for (let i = 0; i < this.dim; i++) {
      const aux = (y - this.middle + i) * this.image.width;
      for (let j = 0; j < this.dim; j++) {
        const index = (aux + (x - this.middle + j)) * 4;
        // default white color
        let R = 255,
          G = 255,
          B = 255;

        // verify that the index does not go out of bounds
        if (
          0 <= index &&
          aux * 4 <= index &&
          index < aux * 4 + this.image.width * 4 &&
          index < this.data.length
        ) {
          R = this.data[index];
          G = this.data[index + 1];
          B = this.data[index + 2];
        }

        // paint the color grid
        this.grid.fillStyle = `rgba(${R}, ${G}, ${B}, 1)`;
        this.grid.fillRect(
          j % (this.dim - 1) !== 0
            ? j * this.tile + j - Math.floor(this.tile / 2)
            : j > this.dim - 2
            ? j * this.tile + j - Math.floor(this.tile / 2)
            : j * this.tile + j,
          i % (this.dim - 1) !== 0
            ? i * this.tile + i - Math.floor(this.tile / 2)
            : i > this.dim - 2
            ? i * this.tile + i - Math.floor(this.tile / 2)
            : i * this.tile + i,
          j % (this.dim - 1) === 0 ? this.tile / 2 : this.tile,
          i % (this.dim - 1) === 0 ? this.tile / 2 : this.tile
        );
      }
    }
  }
}
