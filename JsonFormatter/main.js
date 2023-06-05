const toggables = document.querySelectorAll('.JFormat__entry--toggleable');

[...toggables].map(elem => {
  // elem.classList.toggle = '.JFormat__entry--open';
  // console.log(elem.childNodes[1]);

  elem.childNodes[1].addEventListener('click', event => {
    console.log(elem);
    elem.classList.toggle('JFormat__entry--open');
  });
});
