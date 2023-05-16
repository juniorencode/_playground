// interactivity module
currentObject = null;
startX = 0;
startY = 0;

canvas.addEventListener('mousedown', e => {
  squares.map(square => {
    if (collisionSquare(square, { x: e.offsetX, y: e.offsetY, w: 0, h: 0 })) {
      currentObject = square;
      startX = e.offsetX - square.x;
      startY = e.offsetY - square.y;
    }
  });
});

canvas.addEventListener('mousemove', e => {
  if (currentObject != null) {
    currentObject.x = e.offsetX - startX;
    currentObject.y = e.offsetY - startY;

    if (currentObject.normalize) {
      currentObject.normalize();
    }
  }
});

canvas.addEventListener('mouseup', () => {
  currentObject = null;
});
