const grid = document.querySelector('.grid');
const cardTemplate = document.getElementById('card-template');

for (let i = 0; i < 100; i++) {
  grid.append(cardTemplate.content.cloneNode(true));
}

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(posts => {
    grid.innerHTML = '';
    posts.forEach(post => {
      const div = cardTemplate.content.cloneNode(true);
      div.querySelector('[data-image]').src =
        'https://source.unsplash.com/100x100/?nature';
      div.querySelector('[data-title]').textContent = post.title;
      div.querySelector('[data-body]').textContent = post.body;
      grid.append(div);
    });
  });
