class InputImageCut {
  constructor(container) {
    this.container = container;
    this.input = document.createElement('input');
    this.input.type = 'file';

    this.drawbanner();
    this.container.addEventListener('click', () => this.handleInput());
  }

  handleInput() {
    this.input.click();
  }

  drawbanner() {
    const banner = document.createElement('div');
    const icon = document.createElement('i');
    const paragraph = document.createElement('p');
    const text = document.createTextNode(
      'Drop your photo here or browse your computer'
    );
    banner.classList.add('InputImageCut__banner');
    icon.classList.add('far', 'fa-image');
    paragraph.append(text);
    banner.append(icon);
    banner.append(paragraph);
    this.container.append(banner);
  }
}
