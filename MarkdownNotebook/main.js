const notebook = document.querySelector('.Notebook');

notebook.addEventListener('keydown', e => {
  if (!e.target.matches('.Notebook__input')) return;

  const currentNote = e.target.closest('.Notebook__note');

  console.log(currentNote);
});

const createNote = () => {
  const box = document.createElement('div');
  const input = document.createElement('div');

  box.classList.add('Notebook__note');
  input.classList.add('Notebook__input');
  input.contentEditable = true;
  box.append(input);

  return box;
};

notebook.append(createNote());
