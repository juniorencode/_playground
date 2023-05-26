const sudoku = document.querySelector('#sudoku');
const button = document.querySelector('#button');
const grid = [];

const sudokuGenerate = () => {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let j = 0; j < 9; j++) {
    grid[0][j] = nums[j];
  }

  solve(grid);
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

const solve = board => {
  const nextEmptyCell = findNextEmptyCell(board);

  // if there are no empty cells, the Sudoku is solved
  if (!nextEmptyCell) return true;

  const [row, col] = nextEmptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      // call solve() recursively with the updated new cell
      if (solve(board)) return true;

      // if a solution cannot be found with the current number, go back
      board[row][col] = 0;
    }
  }

  return false; // if a solution cannot be found with any of the numbers, go back even
};

const findNextEmptyCell = board => {
  // find the next empty cell
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }

  return null; // if there are no empty cells
};

const isValid = (board, row, col, num) => {
  return (
    !getRow(board, row).includes(num) &&
    !getCol(board, col).includes(num) &&
    !getBox(board, row, col).includes(num)
  );
};

// return the values in the specified row
const getRow = (board, row) => board[row];

// return the values in the specified column
const getCol = (board, col) => {
  const colValues = [];

  for (let i = 0; i < 9; i++) {
    colValues.push(board[i][col]);
  }

  return colValues;
};

// return the values in the 3x3 square to which the specified cell belongs
const getBox = (board, row, col) => {
  const boxValues = [];
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      boxValues.push(board[i][j]);
    }
  }

  return boxValues;
};

const init = () => {
  fillZeros();
  sudokuGenerate();
};

button.addEventListener('click', () => {
  init();
});

init();
