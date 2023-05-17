const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pointRadius = 10;
const points = [];

const drawMap = (x, y) => {
  // generate points
  points.push({ x: x, y: y });

  // draw red points on top of the gradient
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    ctx.beginPath();
    ctx.rect(point.x - 2, point.y - 2, 4, 4);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
};

document.body.addEventListener('click', e => {
  drawMap(e.clientX, e.clientY);
});
