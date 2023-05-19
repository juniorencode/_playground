window.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('grid');
  let squares = [];

  // generate the square grid
  function generateGrid() {
    gridContainer.innerHTML = '';

    // get the width and height of the window
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // define the width and height of the squares
    const squareWidth = 60;
    const squareHeight = 60;

    // number of squares per row and total number of rows
    const squaresPerRow = Math.floor(screenWidth / squareWidth);
    const numRows = Math.floor(screenHeight / squareHeight);

    // total number of squares
    const totalSquares = squaresPerRow * numRows;

    squares = [];

    // horizontal and vertical offset to center the grid
    const offsetX = (screenWidth - squaresPerRow * squareWidth) / 2;
    const offsetY = (screenHeight - numRows * squareHeight) / 2;

    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement('div');
      square.classList.add('square');

      // x and y position of the square
      const x = (i % squaresPerRow) * squareWidth + offsetX;
      const y = Math.floor(i / squaresPerRow) * squareHeight + offsetY;

      square.style.width = squareWidth + 'px';
      square.style.height = squareHeight + 'px';
      square.style.left = x + 'px';
      square.style.top = y + 'px';

      gridContainer.appendChild(square);

      const squareObj = {
        x: x,
        y: y,
        w: squareWidth,
        h: squareHeight,
        element: square
      };
      squares.push(squareObj);
    }
  }

  generateGrid();

  window.addEventListener('resize', generateGrid);
});
