const file = document.querySelector('#file');
const textarea = document.querySelector('#code');
const button = document.querySelector('#button');

const minifyCode = () => {};

file.addEventListener('input', e => {
  const uploadedFile = e.target.files[0];

  if (uploadedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(uploadedFile);
    fileReader.onload = e => {
      const fileData = e.target.result;
      textarea.value = fileData;
    };
  }
});

button.addEventListener('click', () => {
  const link = document.createElement('a');
  const file = new Blob([minifyCode()], {
    type: 'text/javascript'
  });

  link.href = URL.createObjectURL(file);
  link.download = 'main.min.js';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
});
