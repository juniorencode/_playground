// collision module

// native
const collisionSquareWithSquare = (square1, square2) => {
  return (
    square1.x + square1.w > square2.x &&
    square1.x < square2.x + square2.w &&
    square1.y + square1.h > square2.y &&
    square1.y < square2.y + square2.h
  );
};

const collisionSquareWithPoint = (square, point) => {
  return collisionSquareWithSquare(square, { ...point, w: 0, h: 0 });
};

const collisionCircleWithCircle = (circle1, circle2) => {
  const radii = circle1.r + circle2.r; // sum of the radii of both circles

  // distance between the squared and the centers of the circles
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distanceSquared = dx * dx + dy * dy; // squared distance from centers

  return distanceSquared <= radii * radii;
};

const collisionCircleWithPoint = (circle, point) => {
  return collisionCircleWithCircle(circle, { ...point, r: 0 });
};

const collisionSquareWithCircle = (square, circle) => {
  // closest point of the square to the circle
  const closestX = Math.max(square.x, Math.min(circle.x, square.x + square.w));
  const closestY = Math.max(square.y, Math.min(circle.y, square.y + square.h));

  // distance between the squared and the closest point and the center of the circle
  const distanceX = circle.x - closestX;
  const distanceY = circle.y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  // check if the squared distance is less than or equal to the squared radius of the circle
  return distanceSquared <= circle.r * circle.r;
};

// =================================================
// iteration of all possible collisions
const checkSquaresWithSquares = () => {
  let collision = false;

  squares.map((square1, i) => {
    squares.map((square2, j) => {
      if (i !== j) {
        if (collisionSquareWithSquare(square1, square2)) {
          collision = true;
        }
      }
    });
  });

  return collision;
};

function checkCirclesWithCircles() {
  let collision = false;

  circles.map((circle1, i) => {
    circles.map((circle2, j) => {
      if (i !== j) {
        if (collisionCircleWithCircle(circle1, circle2)) {
          collision = true;
        }
      }
    });
  });

  return collision;
}

const checkSquaresWithCircles = () => {
  let collision = false;

  squares.map(square => {
    circles.map(circle => {
      if (collisionSquareWithCircle(square, circle)) {
        collision = true;
      }
    });
  });

  return collision;
};

const checkAllCollisions = () => {
  return (
    checkSquaresWithSquares() ||
    checkCirclesWithCircles() ||
    checkSquaresWithCircles()
  );
};
