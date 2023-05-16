let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let squares = [];

canvas.width = 700;
canvas.height = 700;

const clear = () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
};

const draw = () => {
  squares.map(square => square.draw());
};

const loop = () => {
  clear();
  draw();

  requestAnimationFrame(loop);
};

loop();

const randomRGBColor = () => {
  return `rgb(${Math.floor(Math.random() * 225)}, ${Math.floor(
    Math.random() * 225
  )}, ${Math.floor(Math.random() * 225)})`;
};

class Square {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = randomRGBColor();

    this.draw();
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

squares.push(new Square(10, 10, 50, 50));
squares.push(new Square(10, 70, 50, 50));
