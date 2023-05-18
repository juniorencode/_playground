// shape module
class Square {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w; // width
    this.h = h; // height
    this.color = randomRGBColor();

    this.draw();
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r; // radii

    this.draw();
    this.color = randomRGBColor();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
