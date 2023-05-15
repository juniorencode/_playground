const button = document.querySelector('#btnNav');
let boolNav = false;

button.addEventListener('click', e => {
  e.preventDefault();
  navBar();
});

const navBar = () => {
  const nav = document.querySelector('.nav');
  const navSide = document.querySelector('.nav__side');
  const navCom = document.querySelector('.navCom');
  const navComSide = document.querySelector('.navCom__side');

  const navContent = document.querySelector('.nav__content');
  const navInfo = document.querySelector('.nav__info');

  const reset = () => {
    nav.classList.remove('nav--in');
    navSide.classList.remove('nav__side--in');
    navCom.classList.remove('navCom--in');
    navComSide.classList.remove('navCom__side--in');

    navContent.classList.remove('nav__content--in');
    navInfo.classList.remove('nav__info--in');

    nav.classList.remove('nav--out');
    navSide.classList.remove('nav__side--out');
    navCom.classList.remove('navCom--out');
    navComSide.classList.remove('navCom__side--out');

    navContent.classList.remove('nav__content--out');
    navInfo.classList.remove('nav__info--out');
  };

  if (!boolNav) {
    reset();

    nav.style.display = 'block';

    nav.classList.add('nav--in');
    navSide.classList.add('nav__side--in');
    navCom.classList.add('navCom--in');
    navComSide.classList.add('navCom__side--in');

    navContent.classList.add('nav__content--in');
    navInfo.classList.add('nav__info--in');

    boolNav = true;
  } else {
    reset();

    nav.classList.add('nav--out');
    navSide.classList.add('nav__side--out');
    navCom.classList.add('navCom--out');
    navComSide.classList.add('navCom__side--out');

    navContent.classList.add('nav__content--out');
    navInfo.classList.add('nav__info--out');

    setTimeout(() => {
      nav.style.display = 'none';
    }, 2000);

    boolNav = false;
  }
};
