const input = document.querySelector('#password-input');
const btn = document.querySelector('#password-button');
const icon = btn.querySelector('i');
let see = false;

btn.addEventListener('click', () => {
  if (see) {
    input.setAttribute('type', 'password');
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    see = false;
  } else {
    input.setAttribute('type', 'text');
    icon.classList.add('fa-eye-slash');
    icon.classList.remove('fa-eye');
    see = true;
  }
});
