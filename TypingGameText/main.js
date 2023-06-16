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

const initTyping = () => {
  let characters = typingText.querySelectorAll('span');
  let typedChar = inpField.value.split('')[charIndex];

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains('incorrect')) {
          mistakes--;
        }
        characters[charIndex].classList.remove('correct', 'incorrect');
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add('correct');
      } else {
        mistakes++;
        characters[charIndex].classList.add('incorrect');
      }
      charIndex++;
    }
    characters.forEach(span => span.classList.remove('active'));
    characters[charIndex].classList.add('active');

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = '';
  }
};

inpField.addEventListener('input', initTyping);

loadParagraph();
