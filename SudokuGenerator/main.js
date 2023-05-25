const sudoku = document.querySelector('#sudoku');
const grid = [];

const sudokuGenerate = () => {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let j = 0; j < 9; j++) {
    grid[0][j] = nums[j];
  }

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

const shuffle = array => {
  // Fisher-Yates Shuffle Algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

fillZeros();
sudokuGenerate();
