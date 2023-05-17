const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pointSize = 4;
const points = [];

// Constants for the KDE
const gridSize = 1; // grid size
const kernelBandwidth = 30; // kernel bandwidth

const drawMap = (x, y) => {
  clear();

  // generate points
  points.push({ x: x, y: y });

  // calculate density using KDE
  let totalDensity = 0; // total sum of densities

  for (let j = 0; j < points.length; j++) {
    const distX = x - points[j].x;
    const distY = y - points[j].y;
    const distSquared = distX * distX + distY * distY;

    totalDensity += Math.exp(
      -distSquared / (5 * kernelBandwidth * kernelBandwidth)
    );
  }

  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      let density = 0;

      for (let j = 0; j < points.length; j++) {
        const distX = x - points[j].x;
        const distY = y - points[j].y;
        const distSquared = distX * distX + distY * distY;

        density += Math.exp(
          -distSquared / (2 * kernelBandwidth * kernelBandwidth)
        );
      }

      // draw density on the canvas
      ctx.beginPath();
      ctx.rect(x, y, gridSize, gridSize);

      // adjust color based on density and total sum of densities
      const colorIntensity = density / totalDensity;
      const color = 'rgba(0, 0, 255, ' + colorIntensity + ')';
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    }
  }

  // draw red points on top of the gradient
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    ctx.beginPath();
    ctx.rect(
      point.x - pointSize / 2,
      point.y - pointSize / 2,
      pointSize,
      pointSize
    );
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
};

// clear canvas
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

document.body.addEventListener('click', e => {
  drawMap(e.clientX, e.clientY);
});
