class HtmlToATS {
  constructor(input, output) {
    this.input = input;
    this.output = output;

    this.html = this.input.value;

    this.input.addEventListener('input', () => {
      this.update();
    });
  }

  update() {
    this.html = this.input.value;
  }

  insert(text) {
    this.input.value = text;
    this.update();
  }
}
