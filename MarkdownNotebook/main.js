const notebook = document.querySelector('.Notebook');

const regTitle = /^#+/;

const SPACEBAR = 32;
const ENTER = 13;
const ARROWUP = 38;
const ARROWDOWN = 40;

notebook.addEventListener('keydown', e => {
  if (!e.target.matches('.Notebook__input')) return;

  const currentNote = e.target.closest('.Notebook__note');
  const isSingleLineInput = !e.target.innerText.includes('\n');

  if (e.keyCode === SPACEBAR && e.target.innerText.startsWith('#')) {
    const noteInput = e.target;
    const titleLevel = noteInput.innerText.match(regTitle)[0].length;
    const titleContent = noteInput.innerText.replace(regTitle, '').trim();

    if (titleLevel > 3) return;

    noteInput.innerText = titleContent;
    noteInput.classList.add('Notebook__input--heading' + titleLevel);
    e.preventDefault();
  } else if (e.keyCode === ENTER && !e.shiftKey) {
    const newNote = createNote();

    currentNote.after(newNote);
    newNote.querySelector('.Notebook__input').focus();
    e.preventDefault();
  } else if (isSingleLineInput) {
    if (e.keyCode === ARROWUP) {
      const previousNote = currentNote.previousElementSibling;

      if (!previousNote) return;

      const previousInput = previousNote.querySelector('.Notebook__input');

      previousInput.focus();
      e.preventDefault();
    }
  }

  // console.log(currentNote);
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
