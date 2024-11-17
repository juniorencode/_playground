const section = document.querySelector('section'),
  hireBtn = section.querySelector('#hireBtn'),
  closeBtn = section.querySelectorAll('#close'),
  textArea = section.querySelector('textarea');

hireBtn.addEventListener('click', () => {
  section.classList.add('active');
});

closeBtn.forEach(cBtn => {
  cBtn.addEventListener('click', () => {
    section.classList.remove('active');
    textArea.value = '';
  });
});
