class InputPagination {
  constructor(options) {
    this.container = options.container;
    this.totalItems = options.size;
    this.totalToPage = options.limit;
    this.totalPages = Math.ceil(this.totalItems / this.totalToPage);
    this.page = 1;

    this.pagination = [];
    this.init();
  }

  init() {
    this.buildPagination();
    this.appendPagination();
  }

  setPage(numb) {
    if (numb < 1 || numb > this.totalPages) return;
    this.clearContainer();
    this.page = numb;
    this.pagination = [];
    this.buildPagination();
    this.appendPagination();
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  buildPagination() {
    if (this.totalPages <= 7) {
      this.pagination = Array.from(
        { length: this.totalPages - 2 },
        (_, i) => i + 2
      );
    } else {
      if (this.page <= 4) {
        this.pagination = [2, 3, 4, 5];
      } else if (this.page >= this.totalPages - 3) {
        this.pagination = Array.from(
          { length: 4 },
          (_, i) => this.totalPages - i - 1
        );
      } else {
        this.pagination = [this.page - 1, this.page, this.page + 1];
      }
    }

    this.pagination.sort((a, b) => a - b);
  }

  appendPagination() {
    this.container.append(this.createArrow('left'));

    this.container.append(this.createButton(1));

    if (this.totalPages > 7 && this.pagination[0] !== 2)
      this.container.append(this.createSpread());

    this.pagination.forEach(page => {
      this.container.append(this.createButton(page));
    });

    if (
      this.totalPages > 7 &&
      this.pagination[this.pagination.length - 1] !== this.totalPages - 1
    )
      this.container.append(this.createSpread());

    this.totalPages > 1 &&
      this.container.append(this.createButton(this.totalPages));

    this.container.append(this.createArrow('right'));
  }

  createElement(type, content) {
    const button = document.createElement(type);
    const text = document.createTextNode(content);
    if (type === 'button') {
      button.classList.add('InputPagination__button');
      button.addEventListener('click', () => this.setPage(content));
    }
    content === this.page &&
      button.classList.add('InputPagination__button--current');
    button.append(text);
    return button;
  }

  createArrow(type) {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.classList.add('InputPagination__button');
    icon.classList.add('fa-solid', 'fa-chevron-' + type);
    button.append(icon);
    button.addEventListener('click', () => {
      const numb = this.page + 1 - (type === 'left' ? 2 : 0);
      this.setPage(numb);
    });
    return button;
  }

  createButton(content) {
    return this.createElement('button', content);
  }

  createSpread() {
    return this.createElement('span', '...');
  }
}
