const grid = document.querySelector('.grid');
const cardTemplate = document.getElementById('card-template');

for (let i = 0; i < 10; i++) {
  grid.append(cardTemplate.content.cloneNode(true));
}
