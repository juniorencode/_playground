class ImageColorPicker {
  constructor(image) {
    this.image = image;
    this.position = null;
    this.dim = 9;
    this.middle = Math.floor(this.dim / 2);
    this.tile = 12;
    this.size = (this.dim - 1) * this.tile + (this.dim - 1);
    this.content = document.createElement('div');

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

    this.position = this.image.getBoundingClientRect();

    // applying inline styles to the color grid container
    this.content.style.width = `${this.size}px`;
    this.content.style.height = `${this.size}px`;
    this.content.style.borderRadius = `${this.size / 2}px`;
    this.content.style.border = 'solid 1px #000';
    this.content.style.position = 'absolute';
    this.content.style.background = '#fff';
    this.content.style.overflow = 'hidden';
    this.content.style.cursor = 'none';
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

  move(e) {
    if (this.isInside(e.pageX, e.pageY)) {
      if (!this.inside) this.start();

      //reposition the "ColorPicker" to the center with reference to the mouse position
      this.content.style.top = `${Math.floor(e.pageY - this.size / 2) - 4}px`;
      this.content.style.left = `${Math.floor(e.pageX - this.size / 2) - 4}px`;
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
}
