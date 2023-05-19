// interactivity module
currentObject = null;
startX = 0;
startY = 0;

canvas.addEventListener('mousedown', e => {
  rectangles.map(rectangle => {
    if (
      collisionRectangleWithPoint(rectangle, { x: e.offsetX, y: e.offsetY })
    ) {
      currentObject = rectangle;
      startX = e.offsetX - rectangle.x;
      startY = e.offsetY - rectangle.y;
    }
  });

  circles.map(circle => {
    if (collisionCircleWithPoint(circle, { x: e.offsetX, y: e.offsetY })) {
      currentObject = circle;
      startX = e.offsetX - circle.x;
      startY = e.offsetY - circle.y;
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
