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

  buildPagination() {
    if (this.totalPages <= 7) {
      for (let i = 2; i < this.totalPages; i++) {
        this.pagination.push(i);
      }
    } else {
      if (this.page <= 5) {
        if (this.page <= 4) {
          this.pagination.push(2);
          this.pagination.push(3);
        }

        this.pagination.push(4);
        this.pagination.push(5);
      }

      if (this.page >= 5 && this.page <= this.totalPages - 2) {
        this.pagination.push(this.page - 1);
        this.pagination.push(this.page);
        this.pagination.push(this.page + 1);
      }

      if (this.page >= this.totalPages - 3) {
        this.pagination.push(this.totalPages - 1);
        this.pagination.push(this.totalPages - 2);
        this.pagination.push(this.totalPages - 3);
        this.pagination.push(this.totalPages - 4);
      }
    }

    this.pagination = [...new Set(this.pagination)].sort((a, b) => a - b);
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

    this.container.append(this.createButton(this.totalPages));

    this.container.append(this.createArrow('right'));
  }

  createElement(type, content) {
    const button = document.createElement(type);
    const text = document.createTextNode(content);
    button.append(text);
    return button;
  }

  createArrow(type) {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-chevron-' + type);
    button.append(icon);
    return button;
  }

  createButton(content) {
    return this.createElement('button', content);
  }

  createSpread() {
    return this.createElement('span', '...');
  }
}
