const inputs = document.querySelectorAll('.otp__input');

inputs.forEach((input, currentIndex) => {
  // paste event
  input.addEventListener('paste', e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9\s]/g, '');
    console.log(text);
    inputs.forEach((item, index) => {
      if (index >= currentIndex && text[index - currentIndex]) {
        item.value = text[index - currentIndex] || '';

        if (item.nextElementSibling) {
          item.nextElementSibling.focus();
        } else {
          item.blur();
        }

        toggleFilledClass(item);
      }
    });
  });

  // backspace event
  input.addEventListener('keydown', e => {
    if (e.ctrlKey) return;

    e.preventDefault();

    if (e.key === 'Backspace') {
      input.value = '';
      if (input.previousElementSibling) input.previousElementSibling.focus();
    } else {
      if (!/^[a-zA-Z0-9]$/.test(e.key) || e.key.length !== 1) return;

      input.value = e.key;

      if (input.nextElementSibling) {
        input.nextElementSibling.focus();
      } else {
        input.blur();
      }
    }

    toggleFilledClass(input);
  });
});

const toggleFilledClass = field => {
  if (field.value) {
    field.classList.add('otp__input--filled');
  } else {
    field.classList.remove('otp__input--filled');
  }
};
