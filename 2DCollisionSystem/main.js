let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let rectangles = [];
let circles = [];
let triangles = [];

canvas.width = 600;
canvas.height = 600;

const clear = () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
};

const draw = () => {
  rectangles.map(square => square.draw());
  circles.map(circle => circle.draw());
  triangles.map(triangle => triangle.draw());
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

rectangles.push(new Rectangle(20, 10, 30, 50));
rectangles.push(new Rectangle(10, 70, 50, 30));
rectangles.push(new Rectangle(10, 110, 50, 50));
rectangles.push(new Rectangle(10, 170, 50, 50));
circles.push(new Circle(35, 255, 25));
circles.push(new Circle(35, 315, 25));
triangles.push(new Triangle(35, 355, 10, 405, 60, 405));
triangles.push(new Triangle(35, 415, 10, 465, 60, 465));
triangles.push(new Triangle(10, 480, 20, 530, 60, 540));
triangles.push(new Triangle(10, 550, 20, 590, 60, 570));
