const image = document.querySelector('img');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

image.addEventListener('load', () => {
  console.log('load..!!');

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);
  ctx.fillStyle = 'green';
  ctx.fillRect(150, 150, 100, 100);
});
