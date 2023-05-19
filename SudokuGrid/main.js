// Initial Sudoku Configuration
const board = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const canvas = document.querySelector('#sudoku');
const ctx = canvas.getContext('2d');

// Cell size
const getCellSize = () => {
  return canvas.width / 9;
};

// Canvas size
const getCanvasSize = () => {
  return 450;
};

canvas.width = getCanvasSize();
canvas.height = getCanvasSize();

const drawGrid = (cellSize, canvasSize) => {
  ctx.strokeStyle = 'lightgray';
  ctx.lineWidth = 1;
  ctx.beginPath();

  // Draw vertical and horizontal lines
  for (let i = 0; i <= canvasSize; i += cellSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasSize);
    ctx.moveTo(0, i);
    ctx.lineTo(canvasSize, i);
  }

  ctx.closePath();
  ctx.stroke();

  // Draw thicker lines for the subregions
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i <= canvas.width; i += 3 * cellSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }

  ctx.closePath();
  ctx.stroke();
};

// Function to draw the Sudoku
const drawSudoku = () => {
  const cellSize = getCellSize();
  const canvasSize = getCanvasSize();

  ctx.clearRect(0, 0, canvasSize, canvasSize);

  drawGrid(cellSize, canvasSize);
};

drawSudoku();
