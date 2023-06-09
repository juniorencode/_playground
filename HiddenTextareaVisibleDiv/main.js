const textarea = document.querySelector('#textarea');
const ctnEditor = document.querySelector('#editor');
const ctnCursor = document.querySelector('#cursor');

const Editor = {
  position: ctnEditor.getBoundingClientRect()
};

const Typography = {
  width: 0,
  padding: 3,
  family: 'monospace',
  size: 14,
  getWidth: function () {
    return (7.6961 * this.size) / 14;
  },
  getHeight: function () {
    return (17 * this.size) / 14;
  },
  getTall: function () {
    return this.getHeight() + this.padding * 2;
  }
};

const Cursor = {
  top: Editor.position.y,
  left: Editor.position.x
};

const handleInput = () => {
  ctnEditor.innerHTML = textarea.value;
  renderCursor();
};

const handleKeydown = e => {
  if (e.key === 'Shift') return;

  switch (e.key) {
    case 'ArrowRight':
      Cursor.left += Typography.width;
      break;
    case 'ArrowLeft':
      Cursor.left -= Typography.width;
      break;
    case 'Backspace':
      Cursor.left -= Typography.width;
      break;
    default:
      Cursor.left += Typography.width;
      break;
  }
  renderCursor();
};

const renderCursor = () => {
  ctnCursor.style.top = `${Cursor.top}px`;
  ctnCursor.style.left = `${Cursor.left}px`;
};

const defaultActions = () => {
  Typography.width = (7.6961 * Typography.size) / 14;
  Typography.height = (17 * Typography.size) / 14;
  Typography.tall = Typography.height + Typography.padding * 2;

  ctnEditor.style.fontFamily = Typography.family;
  ctnEditor.style.fontSize = `${Typography.size}px`;

  ctnCursor.style.height = `${Typography.getHeight()}px`;

  handleInput();
};

textarea.focus();
textarea.addEventListener('keydown', handleKeydown);
textarea.addEventListener('input', handleInput);
defaultActions();
