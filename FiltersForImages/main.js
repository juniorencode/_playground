const input = document.querySelector('.upload input');
const btnGrayscale = document.querySelector('#btnGrayscale');
const btnInvertColor = document.querySelector('#btnInvertColor');
const btnSepia = document.querySelector('#btnSepia');
const btnReset = document.querySelector('#btnReset');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let image = new Image();
console.log(image.src);

// when the image has been selected
input.addEventListener('change', () => {
  const file = input.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  // when the image has been read
  reader.addEventListener('load', () => {
    image.src = reader.result;
  });
});

// when the image has been uploaded
image.addEventListener('load', () => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
});

// button behavior
btnGrayscale.addEventListener('click', () => {
  convertToGrayscale();
});

btnInvertColor.addEventListener('click', () => {
  convertToInvertColor();
});

btnSepia.addEventListener('click', () => {
  convertToSepia();
});

btnReset.addEventListener('click', () => {
  convertToReset();
});

// filters
const convertToGrayscale = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = (r + g + b) / 3;
    pixels[i] = gray;
    pixels[i + 1] = gray;
    pixels[i + 2] = gray;
  }

  ctx.putImageData(imageData, 0, 0);
};

const convertToInvertColor = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255 - pixels[i];
    pixels[i + 1] = 255 - pixels[i + 1];
    pixels[i + 2] = 255 - pixels[i + 2];
  }

  ctx.putImageData(imageData, 0, 0);
};

const convertToSepia = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    pixels[i] = r * 0.393 + g * 0.769 + b * 0.189;
    pixels[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
    pixels[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
  }

  ctx.putImageData(imageData, 0, 0);
};

const convertToReset = () => {
  if (image.src !== '') {
    ctx.drawImage(image, 0, 0, image.width, image.height);
  }
};
