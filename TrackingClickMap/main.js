const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];

// constants for the KDE
const gridSize = 1; // grid size
const kernelBandwidth = 20; // kernel bandwidth
const bandwidthSquared = 2 * kernelBandwidth * kernelBandwidth;

// define reference colors
var colors = [
  [0, 0, 0], // inverted white to black
  [255, 255, 0], // inverted blue to yellow
  [255, 0, 0], // inverted cyan to red
  [255, 0, 255], // inverted green to magenta
  [0, 0, 255], // inverted yellow to blue
  [0, 255, 255] // inverted red to cyan
];

const drawMap = () => {
  clear();

  // calculate density using KDE
  const pointsLength = points.length;
  let maxDensity = 0; // maximum density
  let rango = 80; // radial range

  for (let j = 0; j < pointsLength; j++) {
    let density = 0;

    for (let k = 0; k < pointsLength; k++) {
      const distX = points[k].x - points[j].x;
      const distY = points[k].y - points[j].y;
      const distSquared = distX * distX + distY * distY;
      density += Math.exp(-distSquared / bandwidthSquared);
    }

    maxDensity = Math.max(maxDensity, density);
  }

  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      let density = 0;

      for (let j = 0; j < pointsLength; j++) {
        const distX = x - points[j].x;
        const distY = y - points[j].y;
        const distSquared = distX * distX + distY * distY;

        density += Math.exp(-distSquared / bandwidthSquared);
      }

      // draw density on the canvas
      ctx.beginPath();
      ctx.rect(x, y, gridSize, gridSize);

      // adjust color based on density and total sum of densities
      const colorIntensity = density / maxDensity;

      // calculate color index based on intensity
      var colorIndex = Math.floor(colorIntensity * (colors.length - 1));

      // get adjacent colors
      var lowerColor = colors[colorIndex];
      var upperColor = colors[colorIndex + 1];

      // check if we are in the last color
      if (!upperColor) {
        ctx.fillStyle =
          'rgba(' +
          lowerColor[0] +
          ', ' +
          lowerColor[1] +
          ', ' +
          lowerColor[2] +
          ', 1)';
      } else {
        // calculate interpolation fraction
        var fraction = colorIntensity * (colors.length - 1) - colorIndex;

        // perform linear interpolation between the colors
        var red = interpolate(lowerColor[0], upperColor[0], fraction);
        var green = interpolate(lowerColor[1], upperColor[1], fraction);
        var blue = interpolate(lowerColor[2], upperColor[2], fraction);

        var color = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
        ctx.fillStyle = color;
      }
      ctx.fill();
      ctx.closePath();
    }
  }
};

// clear canvas
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// linear interpolation function
function interpolate(a, b, fraction) {
  return Math.round(a + (b - a) * fraction);
}

document.body.addEventListener('click', e => {
  // generate point
  points.push({ x: e.clientX, y: e.clientY });

  drawMap();
});
