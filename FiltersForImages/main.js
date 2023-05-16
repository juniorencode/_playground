const input = document.querySelector('.upload input');
const btnGrayscale = document.querySelector('#btnGrayscale');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let image = new Image();

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
