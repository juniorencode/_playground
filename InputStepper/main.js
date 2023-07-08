const input = document.querySelector('input');
const min = parseInt(input.getAttribute('min'));
const max = parseInt(input.getAttribute('max'));
const step = parseInt(input.getAttribute('step'));
const btnDecrement = document.getElementById('decrement');
const btnIncrement = document.getElementById('increment');

const decrement = () => {
  const value = parseInt(input.value) - 1;
  if (value < min || value > max) return;
  input.value = value;
};

const increment = () => {
  const value = parseInt(input.value) + 1;
  if (value < min || value > max) return;
  input.value = value;
};

btnDecrement.addEventListener('click', decrement);
btnIncrement.addEventListener('click', increment);
