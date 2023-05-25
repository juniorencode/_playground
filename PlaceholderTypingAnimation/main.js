const input = document.querySelector('#email');
const txt = 'example@domain.com';
const speed = 120;
let placeholder = '';
let i = 0;

const type = () => {
  placeholder += txt.charAt(i);
  input.setAttribute('placeholder', placeholder);
  i++;
  setTimeout(type, speed);
};

type();
