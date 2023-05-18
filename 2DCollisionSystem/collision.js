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

const collisionCircleWithCircle = (one, two) => {
  const radii = one.r + two.r; // sum of the radii of both circles

  const dxs = Math.abs(one.x - two.x);
  const dys = Math.abs(one.y - two.y);
  const distance = Math.sqrt(Math.pow(dxs, 2) + Math.pow(dys, 2)); // distance from centers

  return distance <= radii;
};

const collisionCircleWithPoint = (circle, point) => {
  return collisionCircleWithCircle(circle, { ...point, r: 0 });
};

// iteration of all possible collisions
const checkSquaresWithSquares = () => {
  let collision = false;

  squares.map((one, i) => {
    squares.map((two, j) => {
      if (i !== j) {
        if (collisionSquareWithSquare(one, two)) {
          collision = true;
        }
      }
    });
  });

  return collision;
};

function checkCirclesWithCircles() {
  let collision = false;

  circles.map((one, i) => {
    circles.map((two, j) => {
      if (i !== j) {
        if (collisionCircleWithCircle(one, two)) {
          collision = true;
        }
      }
    });
  });

  return collision;
}

const checkAllCollisions = () => {
  return checkSquaresWithSquares() || checkCirclesWithCircles();
};
