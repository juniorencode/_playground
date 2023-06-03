class HtmlToATS {
  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.html = this.input.value;

    this.tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)>|<\/([a-zA-Z0-9\-]+)>/g; // regular expression to find HTML tags
    this.linebreakRegex = /[\n]/g; // regular expression to find line breaks

    this.matchStack = []; // stack of matching nodes
    this.parentStack = []; // stack of parent nodes
    this.currentNode = null; // current node in the parsing process
    this.lastIndex = 0; // last hit index in the HTML
    this.currentLine = 1; // current line number
    this.currentColumn = 0; // current column number

    this.input.addEventListener('input', () => {
      this.update();
    });

    this.init();
  }

  update() {
    this.html = this.input.value;
  }

  insert(text) {
    this.input.value = text;
    this.update();
    this.init();
  }

  init() {
    this.result = this.parseHTML();
    this.output.innerText = this.convertStringify(this.result);
  }

  convertStringify(tree) {
    return JSON.stringify(tree, null, 2);
  }

  parseHTML() {
    return {
      type: 'Program',
      value: this.html,
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
      templateNodes: this.parser(),
      range: [0, this.html.length]
    };
  }

  parser() {
    let match;

    while ((match = this.tagRegex.exec(this.html))) {
      const index = match.index; // match index in the HTML
      const text = this.html.substring(this.lastIndex, index); // text between tags
      this.lastIndex = index + match[0].length; // update the last match index

      if (text.length > 0) {
        const textNode = this.parseText(text, index);

        if (this.currentNode && this.currentNode.children) {
          this.currentNode.children.push(textNode);
        } else {
          this.matchStack.push(textNode);
        }
      }
    }

    // returns the parse tree
    return this.matchStack;
  }

  parseText(text, index) {
    const linebreaks = text.match(this.linebreakRegex).length;
    const lastLine = text.split('\n').pop();

    const textNode = {
      type: 'Text',
      value: text,
      loc: {
        start: {
          line: this.currentLine,
          column: this.currentColumn
        },
        end: {
          line: this.currentLine + linebreaks,
          column: this.currentColumn + lastLine.length
        }
      },
      range: [index - text.length, index]
    };

    this.addLine(linebreaks);
    this.currentColumn += lastLine.length;

    return textNode;
  }

  addLine(number = 1) {
    this.currentLine += number;
    this.currentColumn = 0;
  }
}
