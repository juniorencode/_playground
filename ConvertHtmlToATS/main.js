const input = document.querySelector('#code');
const output = document.querySelector('#tree');

input.value = `<p class="blink">
  <span>Hello</span> <span>World</span>
</p>`;

input.addEventListener('input', () => {
  init();
});

const parseHTML = html => {
  const children = parseNode(html);

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
    templateNodes: children
  };
};

const parseNode = html => {
  // regular expression to find HTML tags
  const tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)>|<\/([a-zA-Z0-9\-]+)>/g;

  const matchStack = []; // stack of matching nodes
  let currentNode = null; // current node in the parsing process
  let parentStack = []; // stack of parent nodes
  let match;

  while ((match = tagRegex.exec(html))) {
    const tag = match[1]; // HTML tag name

    if (!tag) continue;

    const node = {
      type: 'element',
      name: tag,
      children: []
    };

    if (currentNode && currentNode.children) {
      currentNode.children.push(node);
    } else {
      matchStack.push(node);
    }

    // set the new node as the current node
    currentNode = node;
  }

  // Returns the first node of the parse tree
  return matchStack[0];
};

const init = () => {
  const tree = parseHTML(input.value);
  output.innerText = JSON.stringify(tree, null, 2);
};

init();
