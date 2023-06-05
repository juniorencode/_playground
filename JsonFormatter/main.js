const toggables = document.querySelectorAll('.JsonFormatter__entry--toggable');

[...toggables].map(elem => {
  // elem.classList.toggle = '.JsonFormatter__entry--open';
  // console.log(elem.childNodes[1]);

  elem.childNodes[1].addEventListener('click', event => {
    console.log(elem);
    elem.classList.toggle('JsonFormatter__entry--open');
  });
});
