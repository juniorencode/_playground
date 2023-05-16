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

currentObject = null;
startX = 0;
startY = 0;

canvas.addEventListener('mousedown', e => {
  squares.map(square => {
    if (
      square.x < e.offsetX &&
      square.w + square.x > e.offsetX &&
      square.y < e.offsetY &&
      square.h + square.y > e.offsetY
    ) {
      currentObject = square;
      startX = e.offsetX - square.x;
      startY = e.offsetY - square.y;
    }
  });
  console.log(currentObject);
});

canvas.addEventListener('mousemove', e => {
  if (currentObject != null) {
    currentObject.x = e.offsetX - startX;
    currentObject.y = e.offsetY - startY;

    if (currentObject.normalize) {
      currentObject.normalize();
    }
  }
});

canvas.addEventListener('mouseup', e => {
  currentObject = null;
});

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
