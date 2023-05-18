const spectrumCanvas = document.getElementById('spectrum-canvas');
const spectrumCtx = spectrumCanvas.getContext('2d');
const spectrumCursor = document.getElementById('spectrum-cursor');
const spectrumRect = spectrumCanvas.getBoundingClientRect();

let currentColor = '';
let hue = 0;
let saturation = 1;
let lightness = 0.5;

const createLinearGradient = (canvas, ctx, color, horizontal = true) => {
  const gradient = ctx.createLinearGradient(
    0,
    0,
    horizontal ? canvas.width : 0,
    !horizontal ? canvas.height : 0
  );
  gradient.addColorStop(0, horizontal ? color : 'transparent');
  gradient.addColorStop(1, !horizontal ? color : 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const createShadeSpectrum = color => {
  if (!color) color = '#f00';
  spectrumCtx.fillStyle = color;
  spectrumCtx.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

  createLinearGradient(spectrumCanvas, spectrumCtx, '#fff');
  createLinearGradient(spectrumCanvas, spectrumCtx, '#000', false);

  spectrumCanvas.addEventListener('click', function (e) {
    getSpectrumColor(e);
  });
};

const getSpectrumColor = e => {
  e.preventDefault();

  const x = e.pageX - spectrumRect.left;
  const y = e.pageY - spectrumRect.top;

  if (x > spectrumRect.width) x = spectrumRect.width;
  if (x < 0) x = 0;
  if (y > spectrumRect.height) y = spectrumRect.height;
  if (y < 0) y = 0.1;

  const xRatio = (x / spectrumRect.width) * 100;
  const yRatio = (y / spectrumRect.height) * 100;
  const hsvValue = 1 - yRatio / 100;
  const hsvSaturation = xRatio / 100;
  lightness = (hsvValue / 2) * (2 - hsvSaturation);
  saturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * lightness - 1));
  console.log('hsl ' + hue + ' ' + saturation + ' ' + lightness);
};

function ColorPicker() {
  createShadeSpectrum();
}

ColorPicker();
