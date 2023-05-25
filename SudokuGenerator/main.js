const sudoku = document.querySelector('#sudoku');
const grid = [];

const sudokuGenerate = () => {
  printGrid();
};

const fillZeros = () => {
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      grid[i][j] = 0;
    }
  }
};

const printGrid = () => {
  cleanGrid();

  for (let i = 0; i < 9; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 9; j++) {
      const div = document.createElement('div');
      div.innerText = grid[i][j];
      row.append(div);
    }
    sudoku.append(row);
  }
};

const cleanGrid = () => {
  sudoku.innerHTML = '';
};

fillZeros();
sudokuGenerate();
