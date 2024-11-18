const textarea = document.querySelector('textarea');

textarea.style.cssText = `height: ${textarea.scrollHeight}px; overflow-y: hidden`;
textarea.focus();

textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
});
