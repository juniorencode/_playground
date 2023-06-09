const textarea = document.querySelector('#textarea');
const editor = document.querySelector('#editor');

textarea.addEventListener('input', e => {
  console.log(e.target);
  const value = textarea.value;

  editor.innerHTML = value;
});
