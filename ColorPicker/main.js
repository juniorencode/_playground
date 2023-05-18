const spectrumCanvas = document.querySelector('#spectrum-canvas');
const spectrumCtx = spectrumCanvas.getContext('2d');
const spectrumCursor = document.querySelector('#spectrum-cursor');
const spectrumRect = spectrumCanvas.getBoundingClientRect();

const red = document.querySelector('#red');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');
const hex = document.querySelector('#hex');

const colorIndicator = document.querySelector('#color-indicator');

let currentColor = '';
let hue = 0;
let saturation = 1;
let lightness = 0.5;

// convert hue to RGB
const hueToRgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

// convert hsl to RGB
const hslToRgb = (h, s, l) => {
  // normalize the HSL values to the range [0, 1]
  h = (h % 360) / 360;
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));

  // calculate the RGB components
  let r, g, b;

  if (s === 0) {
    // if the saturation is 0, the color is a grayscale
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3) ?? 0;
    g = hueToRgb(p, q, h) ?? 0;
    b = hueToRgb(p, q, h - 1 / 3) ?? 0;
  }

  // scale the RGB components to the range [0, 255]
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

// convert hsl to RGB
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

const getColorCodes = (h, s, l) => {
  if (isNaN(h)) h = 0;
  if (isNaN(s)) s = 0;
  if (isNaN(l)) l = 0;

  const { r, g, b } = hslToRgb(h, s, l);
  return {
    _hex: rgbToHex(r, g, b),
    _r: r,
    _g: g,
    _b: b,
    _rgb: `rgba(${r}, ${g}, ${b}, 1)`,
    _h: h,
    _s: s,
    _l: l,
    _hsl: `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  };
};

const setCurrentColor = color => {
  currentColor = color._rgb;
  colorIndicator.style.backgroundColor = color._rgb;
  document.body.style.backgroundColor = color._rgb;
  spectrumCursor.style.backgroundColor = color._rgb;
};

const setColorValues = color => {
  red.value = color._r;
  green.value = color._g;
  blue.value = color._b;
  hex.value = color._hex;
};

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

  spectrumCanvas.addEventListener('mousedown', function (e) {
    startGetSpectrumColor(e);
  });
};

const endGetSpectrumColor = e => {
  spectrumCursor.classList.remove('dragging');
  window.removeEventListener('mousemove', getSpectrumColor);
};

const startGetSpectrumColor = e => {
  getSpectrumColor(e);
  spectrumCursor.classList.add('dragging');
  window.addEventListener('mousemove', getSpectrumColor);
  window.addEventListener('mouseup', endGetSpectrumColor);
};

const getSpectrumColor = e => {
  e.preventDefault();

  let x = e.pageX - spectrumRect.left;
  let y = e.pageY - spectrumRect.top;

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
  console.log(hue, saturation, lightness);
  const color = getColorCodes(hue, saturation, lightness);
  setCurrentColor(color);
  setColorValues(color);
  updateSpectrumCursor(x, y);
};

const updateSpectrumCursor = (x, y) => {
  spectrumCursor.style.left = x + 'px';
  spectrumCursor.style.top = y + 'px';
};

const ColorPicker = () => {
  createShadeSpectrum();
};

ColorPicker();
