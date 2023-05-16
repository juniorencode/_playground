let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let squares = [];

canvas.width = 600;
canvas.height = 600;

const clear = () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
};

const draw = () => {
  squares.map(square => square.draw());
};

// interactivity module
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

// helper functions
const randomRGBColor = () => {
  return `rgb(${Math.floor(Math.random() * 225)}, ${Math.floor(
    Math.random() * 225
  )}, ${Math.floor(Math.random() * 225)})`;
};

// shape module
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

// collision module
const collisionSquares = () => {
  let collision = false;

  squares.map((one, i) => {
    squares.map((two, j) => {
      if (i !== j) {
        if (
          one.x + one.w > two.x &&
          one.x < two.x + two.w &&
          one.y + one.h > two.y &&
          one.y < two.y + two.h
        ) {
          collision = true;
        }
      }
    });
  });

  return collision;
};

// loop module
const loop = () => {
  let isCollision = collisionSquares();

  // change background color
  if (document.body.classList.value === '' && isCollision) {
    document.body.classList.add('error');
  } else if (document.body.classList.value !== '' && !isCollision) {
    document.body.classList.remove('error');
  }

  clear();
  draw();

  requestAnimationFrame(loop);
};

loop();
