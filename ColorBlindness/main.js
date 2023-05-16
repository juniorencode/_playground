const colorPicker = document.querySelector('.colorpicker input');
const deuteranopia = document.querySelector('#deuteranopia');
const protanopia = document.querySelector('#protanopia');
const tritanopia = document.querySelector('#tritanopia');

// hex to rgb
// #FFFFFF  =>  [255, 255, 255]
const convertToRGB = color => {
  return color
    .substr(1)
    .match(/.{2}/g)
    .map(val => parseInt(val, 16));
};

// rgb to hex
// [255, 255, 255]  =>  #FFFFFF
const convertToHex = color => {
  return `#${color
    .map(val => Math.round(val).toString(16).padStart(2, '0'))
    .join('')}`;
};

// Deuteranopia
const convertToDeuteranopia = color => {
  const r = color[0] * 0.625 + color[1] * 0.375 + color[2] * 0;
  const g = color[0] * 0.7 + color[1] * 0.3 + color[2] * 0;
  const b = color[0] * 0 + color[1] * 0.3 + color[2] * 0.7;
  return [r, g, b];
};

colorPicker.addEventListener('input', () => {
  const color = convertToRGB(colorPicker.value);

  const hexDeuteranopia = convertToHex(convertToDeuteranopia(color));
  deuteranopia.querySelector('.view__color').style.background = hexDeuteranopia;
  deuteranopia.querySelector('p').innerText = hexDeuteranopia;
});
