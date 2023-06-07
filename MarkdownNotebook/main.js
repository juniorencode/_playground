const notebook = document.querySelector('.Notebook');

const regTitle = /^#+/;
const regBreakline = /(<br>\s*)+$/gi;

const SPACEBAR = 32;
const BACKSPACE = 8;
const ENTER = 13;
const ARROWUP = 38;
const ARROWDOWN = 40;

notebook.addEventListener('keydown', e => {
  if (!e.target.matches('.Notebook__input')) return;

  const currentNote = e.target.closest('.Notebook__note');
  const currentInput = currentNote?.querySelector('.Notebook__input');
  const isSingleLineInput = !e.target.innerHTML.includes('<br>');

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
  } else if (e.keyCode === ARROWUP) {
    // normalizeInput(currentInput);

    if (isSingleLineInput || isFirstLine(currentInput)) {
      const previousNote = currentNote.previousElementSibling;
      if (!previousNote) return;

      const previousInput = previousNote.querySelector('.Notebook__input');
      const caretPosition = getCaretPosition(currentInput);

      previousInput.focus();
      setDefaultPosition(previousInput, caretPosition);
      e.preventDefault();
    }
  } else if (e.keyCode === ARROWDOWN) {
    // normalizeInput(currentInput);

    if (isSingleLineInput || isLastLine(currentInput)) {
      const nextNote = currentNote.nextElementSibling;
      if (!nextNote) return;

      const nextInput = nextNote.querySelector('.Notebook__input');
      const caretPosition = getCaretPosition(currentInput);

      nextInput.focus();
      setDefaultPosition(nextInput, caretPosition);
      e.preventDefault();
    }
  }
});

notebook.addEventListener('keyup', e => {
  if (!e.target.matches('.Notebook__input')) return;

  const currentNote = e.target.closest('.Notebook__note');
  const currentInput = currentNote?.querySelector('.Notebook__input');

  if (e.keyCode === BACKSPACE) {
    normalizeInput(currentInput);
    e.preventDefault();
  }
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

    const tempContainer = document.createElement('div');
    tempContainer.appendChild(preCaretRange.cloneContents());

    const html = tempContainer.innerHTML;
    const content = html.replace(/<br>/g, '');
    const lineBreaks = html.match(/<br>/g);
    const lineBreakCount = lineBreaks ? lineBreaks.length : 0;
    return content.length + lineBreakCount;
  }

  return 0;
};

const setCaretPosition = (element, position) => {
  const range = document.createRange();
  const selection = window.getSelection();
  const firstChild = element.childNodes[0];
  range.setStart(firstChild, position);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

const setDefaultPosition = (element, position) => {
  const firstChild = element.childNodes[0];
  setCaretPosition(element, Math.min(position, firstChild.length));
};

const isFirstLine = element => {
  const listLines = element.innerText.split('\n');
  const firstLineSize = listLines[0].length;
  const position = getCaretPosition(element);

  return position <= firstLineSize;
};

const isLastLine = element => {
  const listLines = element.innerText.split('\n');
  const lastLineSize = element.innerText.length - listLines.pop().length;
  const position = getCaretPosition(element);

  return position >= lastLineSize;
};

const normalizeInput = element => {
  const endLine = element.innerHTML.match(regBreakline);
  const numBr = endLine ? endLine[0].match(/<br>/g).length : 0;

  if (numBr === 1) {
    element.innerHTML = element.innerHTML.slice(0, -4);
    console.log(element.innerText.length);
  }
};

notebook.append(createNote());
