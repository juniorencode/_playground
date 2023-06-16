const typingText = document.querySelector('.typing p');
const inpField = document.querySelector('.input');
const tryAgainBtn = document.querySelector('.button button');
const timeTag = document.querySelector('.time span');
const mistakeTag = document.querySelector('.mistake span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = (mistakes = isTyping = 0);

loadParagraph = () => {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = '';

  paragraphs[ranIndex].split('').forEach(char => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });

  document.addEventListener('keydown', () => inpField.focus());
  typingText.addEventListener('click', () => inpField.focus());
};

loadParagraph();
