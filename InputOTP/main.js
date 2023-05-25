const inputs = document.querySelectorAll('.otp__input');

inputs.forEach(input => {
  // backspace event
  input.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.key === 'Backspace') {
      input.value = '';

      if (input.previousElementSibling) input.previousElementSibling.focus();
    } else {
      if (!/^[a-zA-Z0-9]$/.test(e.key) || e.key.length !== 1) return;

      if (!input.value && input.nextElementSibling) {
        input.value = e.key;
        input.nextElementSibling.focus();
      } else if (inputs[inputs.length - 1] === input) {
        input.value = e.key;
      }
    }
  });
});
