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

// helper functions
const randomRGBColor = () => {
  return `rgb(${Math.floor(Math.random() * 225)}, ${Math.floor(
    Math.random() * 225
  )}, ${Math.floor(Math.random() * 225)})`;
};

// loop module
const loop = () => {
  let isCollision = checkAllCollisions();

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

squares.push(new Square(10, 10, 50, 50));
squares.push(new Square(10, 70, 50, 50));
