const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.dropdown__select');
  const caret = dropdown.querySelector('.dropdown__caret');
  const menu = dropdown.querySelector('.dropdown__menu');
  const options = dropdown.querySelectorAll('.dropdown__menu li');
  const selected = dropdown.querySelector('.dropdown__selected');

  select.addEventListener('click', () => {
    caret.classList.toggle('dropdown__caret--rotate');
    menu.classList.toggle('dropdown__menu--open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      console.log(dropdown);
      selected.innerText = option.innerText;
      caret.classList.remove('dropdown__caret--rotate');
      menu.classList.remove('dropdown__menu--open');
      options.forEach(option => {
        option.classList.remove('active');
      });
      option.classList.add('active');
    });
  });
});
