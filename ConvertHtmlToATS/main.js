class HtmlToATS {
  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.html = this.input.value;

    this.tagRegex = /<([a-zA-Z0-9\-]+)([^>]*)>|<\/([a-zA-Z0-9\-]+)>/g; // regular expression to find HTML tags
    this.attributeRegex = /([a-zA-Z0-9\-]+)\s*=\s*"([^"]*)"/g; // regular expression to find attributes
    this.linebreakRegex = /[\n]/g; // regular expression to find line breaks

    this.input.addEventListener('input', () => {
      this.update();
    });

    this.init();
  }

  update() {
    this.html = this.input.value;
    this.init();
  }

  insert(text) {
    this.input.value = text;
    this.update();
  }

  init() {
    this.matchStack = []; // stack of matching nodes
    this.parentStack = []; // stack of parent nodes
    this.currentNode = null; // current node in the parsing process
    this.lastIndex = 0; // last hit index in the HTML
    this.currentLine = 1; // current line number
    this.currentColumn = 0; // current column number

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
      const [base, openingTag, attributes, closingTag] = match;
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

      if (!closingTag) {
        const nodeElement = this.parserElement(openingTag, attributes, index);

        // this.addColumn(base.length);

        if (this.currentNode && this.currentNode.children) {
          this.currentNode.children.push(nodeElement);
          this.parentStack.push(this.currentNode);
        } else {
          this.matchStack.push(nodeElement);
        }

        // set the new node as the current node
        this.currentNode = nodeElement;
      } else {
        this.addColumn(base.length);
        this.currentNode.loc.end.line = this.currentLine;
        this.currentNode.loc.end.column = this.currentColumn;

        this.currentNode = this.parentStack.pop();
      }
    }

    // returns the parse tree
    return this.matchStack;
  }

  parseText(text, index) {
    const linebreaks = text.match(this.linebreakRegex)?.length || 0;
    const lastLine = text.split('\n').pop();
    const tempColumn = this.currentColumn;

    this.addLine(linebreaks);
    this.addColumn(lastLine.length);

    return {
      type: 'Text',
      value: text,
      loc: {
        start: {
          line: this.currentLine - linebreaks,
          column: tempColumn
        },
        end: {
          line: this.currentLine,
          column: this.currentColumn
        }
      },
      range: [index - text.length, index]
    };
  }

  parserElement(tag, attributes, index) {
    const tempColumn = this.currentColumn;
    const tagColumnSize = tag.length + 1;

    this.addColumn(tagColumnSize);

    const nodeElement = {
      type: 'Element',
      name: tag,
      attributes: this.parseAttributes(tag, attributes, index + tagColumnSize),
      children: [],
      loc: {
        start: {
          line: this.currentLine,
          column: tempColumn
        },
        end: {
          line: null,
          column: null
        }
      },
      range: [index, null]
    };

    this.addColumn();

    return nodeElement;
  }

  parseAttributes(tag, attributes, index) {
    const attrs = [];
    let lastIndex = 0;
    let match;

    // iterates over the attribute matches and adds them to the attribute object
    while ((match = this.attributeRegex.exec(attributes))) {
      const [base, name, value] = match;
      const blank = attributes.slice(lastIndex, match.index);
      const linebreaksBlank = blank.match(this.linebreakRegex)?.length || 0;
      const lastLineBlank = blank.split('\n').pop().length;

      const linebreaks = value.match(this.linebreakRegex)?.length || 0;
      const lastLine = value.split('\n').pop().length + 1;
      const localIndex = index + match.index;

      if (linebreaksBlank) {
        this.addLine(linebreaksBlank);
        this.addColumn(lastLineBlank);
      } else {
        this.addColumn(blank.length);
      }

      const startLine = this.currentLine;
      const startColumn = this.currentColumn;

      if (linebreaks) {
        this.addLine(linebreaks);
        this.addColumn(lastLine);
      } else {
        this.addColumn(base.length);
      }

      const attribute = {
        name,
        value,
        type: 'TextAttribute',
        loc: {
          start: {
            line: startLine,
            column: startColumn
          },
          end: {
            line: this.currentLine,
            column: this.currentColumn
          }
        },
        range: [localIndex, localIndex + base.length]
      };

      lastIndex += match.index + base.length;
      attrs.push(attribute);
    }

    return attrs;
  }

  addLine(number = 1) {
    this.currentLine += number;
    if (number > 0) this.currentColumn = 0;
  }

  addColumn(number = 1) {
    this.currentColumn += number;
  }
}
