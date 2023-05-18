const spectrumCanvas = document.getElementById('spectrum-canvas');
const spectrumCtx = spectrumCanvas.getContext('2d');
const spectrumCursor = document.getElementById('spectrum-cursor');
const spectrumRect = spectrumCanvas.getBoundingClientRect();

const createLinearGradient = (cv, ctx, color, horizontal = true) => {
  const gradient = ctx.createLinearGradient(
    0,
    0,
    horizontal ? cv.width : 0,
    !horizontal ? cv.height : 0
  );
  gradient.addColorStop(0, horizontal ? color : 'transparent');
  gradient.addColorStop(1, !horizontal ? color : 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, cv.width, cv.height);
};

const createShadeSpectrum = color => {
  if (!color) color = '#f00';
  spectrumCtx.fillStyle = color;
  spectrumCtx.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

  createLinearGradient(spectrumCanvas, spectrumCtx, '#fff');
  createLinearGradient(spectrumCanvas, spectrumCtx, '#000', false);
};

function ColorPicker() {
  createShadeSpectrum();
}

ColorPicker();
