const notebook = document.querySelector('.Notebook');

const titleRegex = /^#+/;
const breaklineRegex = /(<br>\s*)+$/gi;

const SPACEBAR = 32;
const BACKSPACE = 8;
const ENTER = 13;
const ARROWUP = 38;
const ARROWDOWN = 40;
const ARROWLEFT = 37;
const ARROWRIGHT = 39;

// Helper functions
const createNoteElement = () => {
  const box = document.createElement('div');
  const input = document.createElement('div');

  box.classList.add('Notebook__note');
  input.classList.add('Notebook__input');
  input.contentEditable = true;
  box.append(input);

  return box;
};

const getCaretPosition = (element, relative = false) => {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();

    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    if (relative) return preCaretRange.endOffset;

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

const getRelativePosition = element => {
  return getCaretPosition(element, true);
};

const setCaretPosition = (element, position) => {
  const range = document.createRange();
  const selection = window.getSelection();

  const treeWalker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let currentNode = treeWalker.nextNode();
  let currentPosition = 0;

  while (currentNode) {
    const length = currentNode.textContent.length;
    if (currentPosition + length >= position) {
      range.setStart(currentNode, position - currentPosition);
      break;
    }
    currentPosition += length;
    currentNode = treeWalker.nextNode();
  }

  if (!currentNode) {
    const lastChild = element.lastChild;
    range.setStart(lastChild, lastChild?.length);
  }

  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

const setDefaultPosition = (element, position) => {
  const firstChild = element.childNodes[0];
  setCaretPosition(element, Math.min(position, firstChild.length));
};

const setEndPosition = element => {
  setCaretPosition(element, element.innerText.length);
};

const setLastLinePosition = (element, position) => {
  const range = document.createRange();
  const selection = window.getSelection();
  const lastChild = element.lastChild;

  range.setStart(lastChild, Math.min(position, lastChild.length));
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
};

const isFirstLineNote = element => {
  const listLines = element.innerText.split('\n');
  const firstLineSize = listLines[0].length;
  const position = getCaretPosition(element);

  return position <= firstLineSize;
};

const isLastLineNote = element => {
  const listLines = element.innerText.split('\n');
  const lastLineSize = element.innerText.length - listLines.pop().length;
  const position = getCaretPosition(element);

  return position >= lastLineSize;
};

const normalizeInput = element => {
  const endLine = element.innerHTML.match(breaklineRegex);
  const numBr = endLine ? endLine[0].match(/<br>/g).length : 0;

  if (numBr === 1 && element.textContent.length > 0) {
    element.innerHTML = element.innerHTML.slice(0, -4);
    setEndPosition(element);
  }
};

// Event handlers
const handleNotebookKeydown = e => {
  if (!e.target.matches('.Notebook__input')) return;

  const currentNote = e.target.closest('.Notebook__note');
  const currentInput = currentNote?.querySelector('.Notebook__input');
  const isSingleLineInput = !e.target.innerHTML.includes('<br>');

  if (e.keyCode === SPACEBAR && e.target.innerText.startsWith('#')) {
    const noteInput = e.target;
    const titleLevel = noteInput.innerText.match(titleRegex)[0].length;
    const titleContent = noteInput.innerText.replace(titleRegex, '').trim();

    if (titleLevel > 3) return;

    noteInput.innerText = titleContent;
    noteInput.classList.add('Notebook__input--heading' + titleLevel);
    e.preventDefault();
  } else if (e.keyCode === ENTER && !e.shiftKey) {
    const newNote = createNoteElement();

    currentNote.after(newNote);
    newNote.querySelector('.Notebook__input').focus();
    e.preventDefault();
  } else if (e.keyCode === BACKSPACE) {
    const previousNote = currentNote.previousElementSibling;

    if (!previousNote || currentInput.innerText.length > 0) return;

    const previousInput = previousNote.querySelector('.Notebook__input');

    previousInput.focus();
    currentNote.remove();
    e.preventDefault();

    if (previousInput.innerText.length > 0) setEndPosition(previousInput);
  } else if (e.keyCode === ARROWUP) {
    if (isSingleLineInput || isFirstLineNote(currentInput)) {
      const previousNote = currentNote.previousElementSibling;
      if (!previousNote) return;

      const previousInput = previousNote.querySelector('.Notebook__input');
      const caretPosition = getRelativePosition(currentInput);

      previousInput.focus();
      e.preventDefault();

      if (previousInput.innerText.length > 0)
        setLastLinePosition(previousInput, caretPosition);
    }
  } else if (e.keyCode === ARROWDOWN) {
    if (isSingleLineInput || isLastLineNote(currentInput)) {
      const nextNote = currentNote.nextElementSibling;
      if (!nextNote) return;

      const nextInput = nextNote.querySelector('.Notebook__input');
      const caretPosition = getRelativePosition(currentInput);

      nextInput.focus();
      e.preventDefault();

      if (nextInput.innerText.length > 0)
        setDefaultPosition(nextInput, caretPosition);
    }
  } else if (e.keyCode === ARROWLEFT) {
    if (getCaretPosition(currentInput) !== 0) return;
    const previousNote = currentNote.previousElementSibling;
    if (!previousNote) return;

    const previousInput = previousNote.querySelector('.Notebook__input');

    previousInput.focus();
    e.preventDefault();

    if (previousInput.innerText.length > 0) setEndPosition(previousInput);
  } else if (e.keyCode === ARROWRIGHT) {
    if (getCaretPosition(currentInput) !== currentInput.innerText.length)
      return;
    const nextNote = currentNote.nextElementSibling;
    if (!nextNote) return;

    const nextInput = nextNote.querySelector('.Notebook__input');

    nextInput.focus();
    e.preventDefault();

    if (nextInput.innerText.length > 0) setCaretPosition(nextInput, 0);
  }
};

const handleNotebookKeyup = e => {
  if (!e.target.matches('.Notebook__input')) return;

  const currentNote = e.target.closest('.Notebook__note');
  const currentInput = currentNote?.querySelector('.Notebook__input');

  if (e.keyCode === BACKSPACE) {
    normalizeInput(currentInput);
  }
};

// Event listeners
notebook.addEventListener('keydown', handleNotebookKeydown);
notebook.addEventListener('keyup', handleNotebookKeyup);

// initialize notebook with a new note
notebook.append(createNoteElement());
