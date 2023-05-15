let boolNav = false;

const navBar = () => {
  const container = document.querySelector('.container');
  const nav = document.querySelector('.nav');
  const navSide = document.querySelector('.nav__side');
  const navCom = document.querySelector('.navCom');
  const navComSide = document.querySelector('.navCom__side');

  const navContent = document.querySelector('.nav__content');
  const navAddress = document.querySelector('.nav__info');

  nav.classList.add('nav--in');
  navSide.classList.add('nav__side--in');
  navCom.classList.add('navCom--in');
  navComSide.classList.add('navCom__side--in');

  navContent.classList.add('nav__content--in');
  navAddress.classList.add('nav__info--in');
};

navBar();
