class InputImageCut {
  constructor(container) {
    this.container = container;
    this.file = document.createElement('input');
    this.file.type = 'file';
    this.imageTexture = new Image();

    this.drawbanner();
    this.container.addEventListener('click', () => this.handleOpenInputFile());
    this.file.addEventListener('change', () => this.handleSelectFile());
    this.imageTexture.addEventListener('load', () => this.handleUploadFile());
  }

  handleOpenInputFile() {
    this.file.click();
  }

  handleSelectFile() {
    console.log('x');
    this.imageTexture.src = URL.createObjectURL(this.file.files[0]);
  }

  handleUploadFile() {
    console.log('y');
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
