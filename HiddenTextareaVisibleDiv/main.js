const textarea = document.querySelector('#textarea');
const ctnEditor = document.querySelector('#editor');
const ctnCursor = document.querySelector('#cursor');

const Editor = {
  position: ctnEditor.getBoundingClientRect()
};

const Typography = {
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

const renderCursor = () => {
  ctnCursor.style.top = `${Cursor.top}px`;
  ctnCursor.style.left = `${Cursor.left}px`;
};

textarea.addEventListener('input', handleInput);
textarea.focus();

const defaultActions = () => {
  ctnEditor.style.fontFamily = Typography.family;
  ctnEditor.style.fontSize = `${Typography.size}px`;

  ctnCursor.style.height = `${Typography.getHeight()}px`;

  handleInput();
};

defaultActions();
