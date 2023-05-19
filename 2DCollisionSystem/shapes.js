// shape module
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w; // width
    this.h = h; // height
    this.color = randomRGBColor();

    this.draw();
  }

  move(x, y) {
    this.x = x;
    this.y = y;
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
    this.color = randomRGBColor();

    this.draw();
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Triangle {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.color = randomRGBColor();

    this.draw();
  }

  move(x, y) {
    const dx = x - this.x1;
    const dy = y - this.y1;
    console.log(x, y, dx, dy);

    this.x1 += dx;
    this.y1 += dy;
    this.x2 += dx;
    this.y2 += dy;
    this.x3 += dx;
    this.y3 += dy;
  }

  draw() {
    // console.log(ctx);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);
    ctx.closePath();
    ctx.fill();
  }
}
