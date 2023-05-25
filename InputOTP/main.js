const inputs = document.querySelectorAll('.otp__input');

const toggleFilledClass = field => {
  if (field.value) {
    field.classList.add('otp__input--filled');
  } else {
    field.classList.remove('otp__input--filled');
  }
};

inputs.forEach(input => {
  toggleFilledClass(input);
  // backspace event
  input.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.key === 'Backspace') {
      input.value = '';

      if (input.previousElementSibling) input.previousElementSibling.focus();
    } else {
      if (!/^[a-zA-Z0-9]$/.test(e.key) || e.key.length !== 1) return;

      if (input.nextElementSibling) {
        input.value = e.key;
        input.nextElementSibling.focus();
      } else if (inputs[inputs.length - 1] === input) {
        input.value = e.key;
      }
    }
    toggleFilledClass(input);
  });
});

// inputs.forEach((input, currentIndex) => {
//   // fill check
//   toggleFilledClass(input);

//   // paste event
//   input.addEventListener('paste', e => {
//     e.preventDefault();
//     const text = e.clipboardData.getData('text');
//     console.log(text);
//     inputs.forEach((item, index) => {
//       if (index >= currentIndex && text[index - currentIndex]) {
//         item.focus();
//         item.value = text[index - currentIndex] || '';
//         toggleFilledClass(item);
//         verifyOTP();
//       }
//     });
//   });
// });
