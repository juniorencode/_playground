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

const collisionCircle = (one, two) => {
  const radii = one.r + two.r; // sum of the radii of both circles

  const dxs = Math.abs(one.x - two.x);
  const dys = Math.abs(one.y - two.y);
  const distance = Math.sqrt(Math.pow(dxs, 2) + Math.pow(dys, 2)); // distance from centers

  return distance <= radii;
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
