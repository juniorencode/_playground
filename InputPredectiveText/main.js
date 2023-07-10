const words = [
  'Apple',
  'Pencil',
  'Pen',
  'Chair',
  'Helmet',
  'Grapes',
  'Tub',
  'Trophy',
  'Cookie',
  'Donut',
  'Shirt',
  'Bat',
  'Ash',
  'Bell',
  'Chat',
  'Ball',
  'Eye',
  'Fish',
  'Zip',
  'Game',
  'Juice',
  'Orange',
  'Fan',
  'Ice'
];

words.sort();

const input = document.getElementById('input');
const suggestion = document.getElementById('suggestion');
const enterKey = 13;

window.onload = () => {
  input.value = '';
  suggestion.innerHTML = '';
};
