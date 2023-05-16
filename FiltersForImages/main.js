const input = document.querySelector('.upload input');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let img = new Image();

// when the image has been selected
input.addEventListener('change', () => {
  const file = input.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  // when the image has been read
  reader.addEventListener('load', () => {
    img.src = reader.result;
  });
});

// when the image has been uploaded
img.addEventListener('load', () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
});
