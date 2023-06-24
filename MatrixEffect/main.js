const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const charArr = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  'А',
  'В',
  'Г',
  'Д',
  'Є',
  'Ѕ',
  'З',
  'И',
  'Ѳ',
  'І',
  'К',
  'Л',
  'М',
  'Н',
  'Ѯ',
  'Ѻ',
  'П',
  'Ч',
  'Р',
  'С',
  'Т',
  'Ѵ',
  'Ф',
  'Х',
  'Ѱ',
  'Ѿ',
  'Ц'
];
const maxCharCount = 1000;
const fallingCharArr = [];
const fontSize = 15;
const maxColumns = window.innerWidth / fontSize;
let frames = 0;

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    const randomChar = Math.floor(Math.random() * (charArr.length - 1));
    const randomSpeed = Math.random() * fontSize * (3 / 4);
    this.value = charArr[randomChar].toUpperCase();
    this.speed = randomSpeed + fontSize * (3 / 4);
    ctx.fillStyle = 'rgba(0, 255, 0)';
    ctx.font = fontSize + 'px sans-serif';
    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed;
  }
}

const update = () => {
  if (fallingCharArr.length < maxCharCount) {
    const x = Math.floor(Math.random() * maxColumns) * fontSize;
    const y = (Math.random() * canvas.height) / 2 - 50;
    const fallingChar = new FallingChar(x, y);
    fallingCharArr.push(fallingChar);
  }

  ctx.fillStyle = 'rgba(0, 0, 0, .05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < fallingCharArr.length && frames % 2 === 0; i++) {
    fallingCharArr[i].draw();
  }

  requestAnimationFrame(update);
  frames++;
};

update();
