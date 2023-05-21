const board = [
  ['5', '', '4', '6', '', '8', '', '1', '2'],
  ['6', '7', '2', '', '9', '', '3', '4', '8'],
  ['1', '9', '8', '3', '4', '2', '', '', ''],
  ['8', '', '9', '7', '6', '1', '', '2', ''],
  ['4', '', '6', '', '', '', '7', '9', '1'],
  ['7', '1', '', '', '', '4', '8', '5', ''],
  ['', '6', '1', '', '3', '7', '', '', ''],
  ['2', '', '', '4', '', '', '6', '', '5'],
  ['', '', '', '', '', '6', '1', '7', '9']
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

// selected number
let selectedNumber = null;

// selected position
let selectedRow = null;
let selectedCol = null;
let selectedRegionRow = null;
let selectedRegionCol = null;

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // selected cell
  selectedCol = Math.floor(mouseX / getCellSize());
  selectedRow = Math.floor(mouseY / getCellSize());

  // region index
  selectedRegionRow = Math.floor(selectedRow / 3);
  selectedRegionCol = Math.floor(selectedCol / 3);

  // current number in the selected cell
  selectedNumber = board[selectedRow][selectedCol];

  console.log(selectedNumber);

  drawSudoku();
});

const drawSelectedCell = cellSize => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const number = board[row][col];

      // check if the current square is selected
      const isSelectedSquare =
        col === selectedCol ||
        row === selectedRow ||
        (Math.floor(row / 3) === selectedRegionRow &&
          Math.floor(col / 3) === selectedRegionCol);

      if (isSelectedSquare) {
        ctx.fillStyle = 'rgba(0, 0, 0, .1)';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }

      // draw the highlighted square if it is selected or if the number matches
      if (number !== '' && number === selectedNumber) {
        ctx.fillStyle = '#bbdefb';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
};

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

  drawSelectedCell(cellSize);
  drawGrid(cellSize, canvasSize);
  drawNumber(cellSize);
};

drawSudoku();
