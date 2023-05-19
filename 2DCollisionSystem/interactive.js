// interactivity module
currentObject = null;
startX = 0;
startY = 0;

canvas.addEventListener('mousedown', e => {
  rectangles.map(rectangle => {
    if (collisionPointInRectangle({ x: e.offsetX, y: e.offsetY }, rectangle)) {
      currentObject = rectangle;
      startX = e.offsetX - rectangle.x;
      startY = e.offsetY - rectangle.y;
    }
  });

  circles.map(circle => {
    if (collisionPointInCircle({ x: e.offsetX, y: e.offsetY }, circle)) {
      currentObject = circle;
      startX = e.offsetX - circle.x;
      startY = e.offsetY - circle.y;
    }
  });

  triangles.map(triangle => {
    if (collisionPointInTriangle({ x: e.offsetX, y: e.offsetY }, triangle)) {
      currentObject = triangle;
      startX = e.offsetX - triangle.x1;
      startY = e.offsetY - triangle.y1;
    }
  });
});

canvas.addEventListener('mousemove', e => {
  if (currentObject != null)
    currentObject.move(e.offsetX - startX, e.offsetY - startY);
});

canvas.addEventListener('mouseup', () => {
  currentObject = null;
});
