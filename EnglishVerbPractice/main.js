const spanish = document.querySelector('#spanish');
const baseForm = document.querySelector('#base-form');
const thirdPerson = document.querySelector('#third-person');
const past = document.querySelector('#past');
const participle = document.querySelector('#participle');

const play = () => {
  const selected = selectVerb();
  printVerb(selected);
};

const selectVerb = () => {
  const number = Math.floor(Math.random() * (verbs.length - 1));
  return verbs[number];
};

const printVerb = selected => {
  spanish.innerText = selected.spanish;
  baseForm.nextElementSibling.innerText = selected.base;
  gerund.nextElementSibling.innerText = selected.gerund;
  thirdPerson.nextElementSibling.innerText = selected.third;
  past.nextElementSibling.innerText = selected.past;
  participle.nextElementSibling.innerText = selected.participle;
};

play();
