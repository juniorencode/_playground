const textarea = document.querySelector('#textarea');
const editor = document.querySelector('#editor');

const handleInput = e => {
  const value = textarea.value;

  editor.innerHTML = value;
};

textarea.addEventListener('input', handleInput);
