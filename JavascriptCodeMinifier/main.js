const file = document.querySelector('#file');
const textarea = document.querySelector('#code');
const button = document.querySelector('#button');

const minifyCode = () => {
  let code = textarea.value;

  // remove single line comments (//)
  code = code.replace(/\/\/.*$/gm, '');

  // remove block comments (/* */)
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');

  // remove extra whitespace
  code = code.replace(/\s+/g, ' ');

  // remove whitespace between letters and symbols
  code = code.replace(/\s*([(),;{}])\s*/g, '$1');

  // remove spaces around the addition operator
  code = code.replace(/\s*\+\s*/g, '+');

  // remove spaces around the assignment operator
  code = code.replace(/\s*=\s*/g, '=');

  // removes whitespace from both ends
  code = code.trim();

  return code;
};

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
