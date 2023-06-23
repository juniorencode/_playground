class InputPagination {
  constructor(size, limit) {
    this.totalItems = size;
    this.totalToPage = limit;
    this.totalPages = Math.ceil(this.totalItems / this.totalToPage);
    console.log(this.totalPages);
    this.page = 1;

    this.pagination = [];
    this.init();
  }

  init() {
    this.buildPagination();
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

    console.log(this.pagination);
  }
}
