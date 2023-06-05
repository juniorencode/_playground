const toggables = document.querySelectorAll('.JFormat__entry--toggleable');

[...toggables].map(elem => {
  elem.childNodes[1].addEventListener('click', () => {
    elem.classList.toggle('JFormat__entry--open');
  });
});
