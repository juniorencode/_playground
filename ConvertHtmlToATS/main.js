const input = document.querySelector('#code');
const output = document.querySelector('#tree');

input.value = `<p class="blink">
  <span>Hello</span> <span>World</span>
</p>`;

input.addEventListener('input', () => {
  init();
});

const parseHTML = html => {
  return {
    type: 'Program',
    value: html,
    range: [0, html.length],
    loc: {
      start: {
        line: 1,
        column: 0
      },
      end: {
        line: null,
        column: null
      }
    },
    templateNodes: []
  };
};

const init = () => {
  const tree = parseHTML(input.value);
  output.innerText = JSON.stringify(tree, null, 2);
};

init();
