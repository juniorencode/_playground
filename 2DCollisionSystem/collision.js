// collision module
// native
const collisionRectangleWithRectangle = (rectangle1, rectangle2) => {
  return (
    rectangle1.x + rectangle1.w > rectangle2.x &&
    rectangle1.x < rectangle2.x + rectangle2.w &&
    rectangle1.y + rectangle1.h > rectangle2.y &&
    rectangle1.y < rectangle2.y + rectangle2.h
  );
};

const collisionPointInRectangle = (point, rectangle) => {
  return collisionRectangleWithRectangle(rectangle, { ...point, w: 0, h: 0 });
};

const collisionCircleWithCircle = (circle1, circle2) => {
  const radii = circle1.r + circle2.r; // sum of the radii of both circles

  // distance between the squared and the centers of the circles
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distanceSquared = dx * dx + dy * dy; // squared distance from centers

  return distanceSquared <= radii * radii;
};

const collisionPointInCircle = (point, circle) => {
  return collisionCircleWithCircle(circle, { ...point, r: 0 });
};

const direction = (x1, y1, x2, y2, x3, y3) => {
  // direction of point (x3, y3) with respect to the segment (x1, y1) - (x2, y2)
  return (x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1);
};

const collisionPointInTriangle = (point, triangle) => {
  const { x1, y1, x2, y2, x3, y3 } = triangle;

  // direction of the point with respect to each side of the triangle
  const d1 = direction(x1, y1, x2, y2, point.x, point.y);
  const d2 = direction(x2, y2, x3, y3, point.x, point.y);
  const d3 = direction(x3, y3, x1, y1, point.x, point.y);

  // check if the point is inside the triangle
  return (d1 >= 0 && d2 >= 0 && d3 >= 0) || (d1 <= 0 && d2 <= 0 && d3 <= 0);
};

const collisionRectangleWithCircle = (rectangle, circle) => {
  // closest point of the rectangle to the circle
  const closestX = Math.max(
    rectangle.x,
    Math.min(circle.x, rectangle.x + rectangle.w)
  );
  const closestY = Math.max(
    rectangle.y,
    Math.min(circle.y, rectangle.y + rectangle.h)
  );

  // distance between the rectangle and the closest point to the center of the circle
  const distanceX = circle.x - closestX;
  const distanceY = circle.y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  // check if the squared distance is less than or equal to the squared radius of the circle
  return distanceSquared <= circle.r * circle.r;
};

// =================================================
// iteration of all possible collisions
const checkRectanglesWithRectangles = () => {
  let collision = false;

  rectangles.map((rectangle1, i) => {
    rectangles.map((rectangle2, j) => {
      if (i !== j) {
        if (collisionRectangleWithRectangle(rectangle1, rectangle2)) {
          collision = true;
        }
      }
    });
  });

  return collision;
};

const checkCirclesWithCircles = () => {
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
};

const checkRectanglesWithCircles = () => {
  let collision = false;

  rectangles.map(rectangle => {
    circles.map(circle => {
      if (collisionRectangleWithCircle(rectangle, circle)) {
        collision = true;
      }
    });
  });

  return collision;
};

const checkAllCollisions = () => {
  return (
    checkRectanglesWithRectangles() ||
    checkCirclesWithCircles() ||
    checkRectanglesWithCircles()
  );
};
