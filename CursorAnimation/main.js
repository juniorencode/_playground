const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const cursorAnimation = document.querySelector('.wave');

// // follow cursor on mousemove
window.addEventListener('mousemove', e => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  cursorDot.style.display = 'block';

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`
    },
    { duration: 500, fill: 'forwards' }
  );
  cursorOutline.style.display = 'block';
});

window.addEventListener('mouseout', () => {
  cursorDot.style.display = 'none';
  cursorOutline.style.display = 'none';
});

window.addEventListener('click', e => {
  let x = e.clientX;
  let y = e.clientY;

  cursorAnimation.style.left = x + 'px';
  cursorAnimation.style.top = y + 'px';

  let cursorClone = cursorAnimation.cloneNode(true);
  document.querySelector('body').appendChild(cursorClone);

  setTimeout(() => {
    cursorClone.remove();
  }, 1000);
});
