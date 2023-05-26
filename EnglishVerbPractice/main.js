const spanish = document.querySelector('#spanish');
const baseForm = document.querySelector('#base-form');
const thirdPerson = document.querySelector('#third-person');
const past = document.querySelector('#past');
const participle = document.querySelector('#participle');
let selected = {};
let checked = {};

const play = () => {
  reset();
  printVerb();
};

const selectVerb = () => {
  const number = Math.floor(Math.random() * (verbs.length - 1));
  return verbs[number];
};

const printVerb = () => {
  spanish.innerText = selected.spanish;
  baseForm.nextElementSibling.innerText = selected.base;
  gerund.nextElementSibling.innerText = selected.gerund;
  thirdPerson.nextElementSibling.innerText = selected.third;
  past.nextElementSibling.innerText = selected.past;
  participle.nextElementSibling.innerText = selected.participle;
};

const check = (e, type) => {
  if (e.target.value === '') return;

  const elem = e.target;
  const value = elem.value;

  elem.classList.remove('good');
  elem.classList.remove('wrong');

  if (value === selected[type]) {
    checked[type] = true;
    elem.classList.add('good');
  } else {
    elem.classList.add('wrong');
  }

  isComplete() && play();
};

const isComplete = () => {
  return Object.values(checked).every(elem => elem === true);
};

const reset = () => {
  selected = selectVerb();
  checked = {
    base: false,
    gerund: false,
    third: false,
    past: false,
    participle: false
  };

  baseForm.value = '';
  baseForm.classList.remove('good');
  baseForm.classList.remove('wrong');
  baseForm.nextElementSibling.classList.remove('show');

  gerund.value = '';
  gerund.classList.remove('good');
  gerund.classList.remove('wrong');
  gerund.nextElementSibling.classList.remove('show');

  thirdPerson.value = '';
  thirdPerson.classList.remove('good');
  thirdPerson.classList.remove('wrong');
  thirdPerson.nextElementSibling.classList.remove('show');

  past.value = '';
  past.classList.remove('good');
  past.classList.remove('wrong');
  past.nextElementSibling.classList.remove('show');

  participle.value = '';
  participle.classList.remove('good');
  participle.classList.remove('wrong');
  participle.nextElementSibling.classList.remove('show');

  baseForm.focus();
};

const handleHelper = (e, type) => {
  if (e.key === 'Tab' && type === 'participle') {
    e.preventDefault();
    baseForm.select();
  }

  if (e.ctrlKey && e.key === 'q') {
    e.target.nextElementSibling.classList.add('show');
  }
};

baseForm.addEventListener('blur', e => check(e, 'base'));
gerund.addEventListener('blur', e => check(e, 'gerund'));
thirdPerson.addEventListener('blur', e => check(e, 'third'));
past.addEventListener('blur', e => check(e, 'past'));
participle.addEventListener('blur', e => check(e, 'participle'));

baseForm.addEventListener('keydown', e => handleHelper(e, 'base'));
gerund.addEventListener('keydown', e => handleHelper(e, 'gerund'));
thirdPerson.addEventListener('keydown', e => handleHelper(e, 'third'));
past.addEventListener('keydown', e => handleHelper(e, 'past'));
participle.addEventListener('keydown', e => handleHelper(e, 'participle'));

play();
