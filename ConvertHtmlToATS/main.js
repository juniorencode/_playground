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
    // loc: {
    //   start: {
    //     line: 1,
    //     column: 0
    //   },
    //   end: {
    //     line: null,
    //     column: null
    //   }
    // },
    templateNodes: children,
    range: [0, html.length]
  };
};

const parseNode = html => {
  // regular expression to find HTML tags
  const tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)>|<\/([a-zA-Z0-9\-]+)>/g;

  const matchStack = []; // stack of matching nodes
  const parentStack = []; // stack of parent nodes
  let currentNode = null; // current node in the parsing process
  let lastIndex = 0; // last hit index in the HTML
  let match;

  while ((match = tagRegex.exec(html))) {
    const tag = match[1]; // HTML tag name
    const attributes = match[2]; // HTML tag attributes
    const closingTag = match[3]; // Etiqueta de cierre

    const index = match.index; // match index in the HTML
    const text = html.substring(lastIndex, index); // text between tags
    lastIndex = index + match[0].length; // update the last match index

    if (text.length > 0) {
      const textNode = parseText(text, index);

      if (currentNode && currentNode.children) {
        currentNode.children.push(textNode);
      } else {
        matchStack.push(textNode);
      }
    }

    if (closingTag) {
      currentNode = parentStack.pop();
    } else {
      const node = {
        type: 'Element',
        name: tag,
        attributes: parseAttributes(attributes),
        children: [],
        range: [index, null]
      };

      if (currentNode && currentNode.children) {
        currentNode.children.push(node);
        parentStack.push(currentNode);
      } else {
        matchStack.push(node);
      }

      // set the new node as the current node
      currentNode = node;
    }
  }

  // returns the first node of the parse tree
  return matchStack;
};

const parseAttributes = attributes => {
  // regular expression to find attributes
  const attributeRegex = /([a-zA-Z0-9\-]+)\s*=\s*"([^"]*)"/g;

  const attrs = [];
  let match;

  // iterates over the attribute matches and adds them to the attribute object
  while ((match = attributeRegex.exec(attributes))) {
    const attribute = {
      name: match[1],
      value: match[2],
      type: 'TextAttribute'
    };

    attrs.push(attribute);
  }

  // returns the attributes object
  return attrs;
};

const parseText = (text, index) => {
  const textNode = {
    type: 'Text',
    value: text,
    range: [index - text.length, index]
  };

  return textNode;
};

const init = () => {
  const tree = parseHTML(input.value);
  output.innerText = JSON.stringify(tree, null, 2);
};

init();
