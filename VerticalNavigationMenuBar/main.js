const container = document.querySelector('.container');
const toggleClick = document.querySelector('.toggle-box');

toggleClick.addEventListener('click', () => {
  toggleClick.classList.toggle('active');
  container.classList.toggle('active');
});
