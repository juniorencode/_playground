// initial Sudoku Configuration
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

// cell size
const getCellSize = () => {
  return canvas.width / 9;
};

// canvas size
const getCanvasSize = () => {
  return 450;
};

canvas.width = getCanvasSize();
canvas.height = getCanvasSize();

const drawGrid = (cellSize, canvasSize) => {
  ctx.strokeStyle = 'lightgray';
  ctx.lineWidth = 1;
  ctx.beginPath();

  // draw vertical and horizontal lines
  for (let i = 0; i <= canvasSize; i += cellSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasSize);
    ctx.moveTo(0, i);
    ctx.lineTo(canvasSize, i);
  }

  ctx.closePath();
  ctx.stroke();

  // draw thicker lines for the subregions
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

const drawNumber = cellSize => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const number = board[row][col];
      const xPos = col * cellSize + cellSize / 2; // adjust for horizontal centering
      const yPos = row * cellSize + cellSize / 2 + 5; // adjust for vertical centering

      // draw the number
      ctx.font = '36px sans-serif'; // size and font family
      ctx.fillStyle = 'black'; // black color
      ctx.textAlign = 'center'; // center alignment
      ctx.textBaseline = 'middle'; // vertical center alignment
      ctx.fillText(number.toString(), xPos, yPos);
    }
  }
};

// draw the Sudoku
const drawSudoku = () => {
  const cellSize = getCellSize();
  const canvasSize = getCanvasSize();

  ctx.clearRect(0, 0, canvasSize, canvasSize);

  drawGrid(cellSize, canvasSize);
  drawNumber(cellSize);
};

drawSudoku();
