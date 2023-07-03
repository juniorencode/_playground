const image = document.querySelector('img');
const canvas = document.querySelector('canvas');
const button = document.querySelector('button');
const ctx = canvas.getContext('2d');

function sendImageToServer() {
  const imageData = canvas.toDataURL('image/jpeg');

  const byteString = atob(imageData.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const file = new File([ab], 'imagen.jpg', { type: 'image/jpeg' });

  const formData = new FormData();
  formData.append('files', file);

  fetch('http://localhost:5000/uploads', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}

button.addEventListener('click', e => {
  e.preventDefault();
  sendImageToServer();
});

image.addEventListener('load', () => {
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);
  ctx.fillStyle = 'green';
  ctx.fillRect(150, 150, 100, 100);
});
