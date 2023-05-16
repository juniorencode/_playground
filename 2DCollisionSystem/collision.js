// collision module

// native
const collisionSquare = (one, two) => {
  return (
    one.x + one.w > two.x &&
    one.x < two.x + two.w &&
    one.y + one.h > two.y &&
    one.y < two.y + two.h
  );
};

// iteration
const checkSquaresWithSquares = () => {
  let collision = false;

  squares.map((one, i) => {
    squares.map((two, j) => {
      if (i !== j) {
        if (collisionSquare(one, two)) {
          collision = true;
        }
      }
    });
  });

  return collision;
};

const checkAllCollisions = () => {
  return checkSquaresWithSquares();
};
