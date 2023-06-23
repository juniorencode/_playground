const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const drawColor = document.querySelector('.color');
const lineWidthInput = document.querySelector('.linewidth');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth / 2;

const position = { x: 0, y: 0 };
let color = '#000';
let lineWidth = 5;

const reposition = e => {
  console.log(e);
  position.x = e.clientX - canvas.offsetLeft;
  position.y = e.clientY - canvas.offsetTop;
};

const draw = e => {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.moveTo(position.x, position.y);
  reposition(e);
  ctx.lineTo(position.x, position.y);
  ctx.stroke();
  ctx.closePath();
};

document.addEventListener('mousedown', e => {
  document.addEventListener('mousemove', draw);
  reposition(e);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', draw);
});
