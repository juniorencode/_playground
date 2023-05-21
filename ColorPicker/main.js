const spectrumCanvas = document.querySelector('#spectrum-canvas');
const spectrumCtx = spectrumCanvas.getContext('2d');
const spectrumCursor = document.querySelector('#spectrum-cursor');
const spectrumRect = spectrumCanvas.getBoundingClientRect();

const hueCanvas = document.querySelector('#hue-canvas');
const hueCtx = hueCanvas.getContext('2d');
const hueCursor = document.querySelector('#hue-cursor');
const hueRect = hueCanvas.getBoundingClientRect();

const red = document.querySelector('#red');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');
const hex = document.querySelector('#hex');

const modeToggle = document.querySelector('#mode-toggle');
const rgbFields = document.querySelector('#rgb-fields');
const hexField = document.querySelector('#hex-field');
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

// convert hsl to hsv
const hslToHsv = (h, s, l) => {
  const max = l + s * Math.min(l, 1 - l);
  const min = l - s * Math.min(l, 1 - l);
  const delta = max - min;
  const saturation = max === 0 ? 0 : delta / max;

  return {
    h: h,
    s: saturation,
    v: max
  };
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

// convert RGB to hsl
const rgbToHsl = (r, g, b) => {
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);

  const lightness = (max + min) / 2;

  let saturation = 0;
  if (max !== min) {
    const delta = max - min;
    saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  }

  let hue = 0;
  if (max !== min) {
    switch (max) {
      case normalizedR:
        hue =
          (normalizedG - normalizedB) / (6 * (max - min)) +
          (normalizedG < normalizedB ? 1 : 0);
        break;
      case normalizedG:
        hue = (normalizedB - normalizedR) / (6 * (max - min)) + 1 / 3;
        break;
      case normalizedB:
        hue = (normalizedR - normalizedG) / (6 * (max - min)) + 2 / 3;
        break;
    }
  }

  if (hue < 0) hue++;

  return {
    h: hue * 360,
    s: saturation,
    l: lightness
  };
};

// convert hsl to RGB
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

const getColorCodes = (h0, s0, l0) => {
  if (isNaN(h0)) h0 = 0;
  if (isNaN(s0)) s0 = 0;
  if (isNaN(l0)) l0 = 0;

  const { r, g, b } = hslToRgb(h0, s0, l0);
  const { h, s, v } = hslToHsv(h0, s0, l0);
  return {
    _hex: rgbToHex(r, g, b),
    _r: r,
    _g: g,
    _b: b,
    _rgb: `rgba(${r}, ${g}, ${b}, 1)`,
    _h: h0,
    _s: s0,
    _l: l0,
    _hsl: `hsl(${Math.round(h0)}, ${Math.round(s0 * 100)}%, ${Math.round(
      l0 * 100
    )}%)`,
    _h2: h,
    _s2: s,
    _v2: v
  };
};

const setCurrentColor = color => {
  currentColor = color._rgb;
  colorIndicator.style.backgroundColor = color._rgb;
  document.body.style.backgroundColor = color._rgb;
  spectrumCursor.style.backgroundColor = color._rgb;
  hueCursor.style.backgroundColor = 'hsl(' + color._h + ',100%, 50%)';
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
  spectrumCtx.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

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
  const color = getColorCodes(hue, saturation, lightness);
  setCurrentColor(color);
  setColorValues(color);
  updateSpectrumCursor(x, y);
};

const updateSpectrumCursor = (x, y) => {
  spectrumCursor.style.left = x + 'px';
  spectrumCursor.style.top = y + 'px';
};

const createHueSpectrum = () => {
  const hueGradient = hueCtx.createLinearGradient(0, 0, 0, hueCanvas.height);
  hueGradient.addColorStop(0.0, 'hsl(0, 100%, 50%)');
  hueGradient.addColorStop(0.17, 'hsl(298.8, 100%, 50%)');
  hueGradient.addColorStop(0.33, 'hsl(241.2, 100%, 50%)');
  hueGradient.addColorStop(0.5, 'hsl(180, 100%, 50%)');
  hueGradient.addColorStop(0.67, 'hsl(118.8, 100%, 50%)');
  hueGradient.addColorStop(0.83, 'hsl(61.2, 100%, 50%)');
  hueGradient.addColorStop(1.0, 'hsl(360, 100%, 50%)');
  hueCtx.fillStyle = hueGradient;
  hueCtx.fillRect(0, 0, hueCanvas.width, hueCanvas.height);

  hueCanvas.addEventListener('mousedown', e => {
    startGetHueColor(e);
  });
};

const startGetHueColor = e => {
  getHueColor(e);
  hueCursor.classList.add('dragging');
  window.addEventListener('mousemove', getHueColor);
  window.addEventListener('mouseup', endGetHueColor);
};
const getHueColor = e => {
  e.preventDefault();
  let y = e.pageY - hueRect.top;

  if (y > hueRect.height) y = hueRect.height;
  if (y < 0) y = 0;

  const percent = y / hueRect.height;
  hue = 360 - 360 * percent;

  const hueColor = getColorCodes(hue, 1, 0.5);
  const color = getColorCodes(hue, saturation, lightness);
  createShadeSpectrum(hueColor._hsl);
  updateHueCursor(y, hueColor._hsl);
  setCurrentColor(color);
  setColorValues(color);
};

const updateHueCursor = y => {
  hueCursor.style.top = y + 'px';
};

const endGetHueColor = e => {
  hueCursor.classList.remove('dragging');
  window.removeEventListener('mousemove', getHueColor);
};

const ColorPicker = () => {
  createShadeSpectrum();
  createHueSpectrum();
};

modeToggle.addEventListener('click', () => {
  rgbFields.classList.toggle('active');
  hexField.classList.toggle('active');
});

red.addEventListener('change', function () {
  const color = rgbToHsl(red.value, green.value, blue.value);
  colorToPos(color);
});

green.addEventListener('change', function () {
  const color = rgbToHsl(red.value, green.value, blue.value);
  colorToPos(color);
});

blue.addEventListener('change', function () {
  const color = rgbToHsl(red.value, green.value, blue.value);
  colorToPos(color);
});

const colorToPos = hsl => {
  const color = getColorCodes(hsl.h, hsl.s, hsl.l);
  const hsv = { h: color._h2, s: color._s2, v: color._v2 };
  const x = spectrumRect.width * hsv.s;
  const y = spectrumRect.height * (1 - hsv.v);
  hue = hsl.h;
  const hueY = hueRect.height - (hue / 360) * hueRect.height;
  updateSpectrumCursor(x, y);
  updateHueCursor(hueY);
  setCurrentColor(color);
  createShadeSpectrum(colorToHue(color));
};

const colorToHue = color => {
  return getColorCodes(color._h, 1, 0.5)._hsl;
};

ColorPicker();
