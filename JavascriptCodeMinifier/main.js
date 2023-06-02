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
