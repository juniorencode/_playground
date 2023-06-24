const menu = document.querySelector('.menu');
const toggler = document.querySelector('.menu__toggler');

toggler.addEventListener('click', () => {
  menu.classList.toggle('active');
  toggler.classList.toggle('active');
});
