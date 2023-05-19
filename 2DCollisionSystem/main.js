let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let rectangles = [];
let circles = [];

canvas.width = 600;
canvas.height = 600;

const clear = () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
};

const draw = () => {
  rectangles.map(square => square.draw());
  circles.map(circle => circle.draw());
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

rectangles.push(new Rectangle(10, 10, 50, 50));
rectangles.push(new Rectangle(10, 70, 50, 50));
circles.push(new Circle(35, 155, 25));
circles.push(new Circle(35, 215, 25));
