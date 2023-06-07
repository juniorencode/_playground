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

      const currentInput = currentNote.querySelector('.Notebook__input');
      const previousInput = previousNote.querySelector('.Notebook__input');
      const caretPosition = getCaretPosition(currentInput);

      previousInput.focus();
      setCaretPosition(previousInput, caretPosition);

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

const getCaretPosition = element => {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    return preCaretRange.toString().length;
  }

  return 0;
};

const setCaretPosition = (element, position) => {
  const range = document.createRange();
  const selection = window.getSelection();
  const firstChild = element.childNodes[0];
  range.setStart(firstChild, Math.min(position, firstChild.length));
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

notebook.append(createNote());
