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

const collisionRectangleWithPoint = (rectangle, point) => {
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

const collisionCircleWithPoint = (circle, point) => {
  return collisionCircleWithCircle(circle, { ...point, r: 0 });
};

const collisionTriangleWithPoint = (triangle, point) => {
  // calculate the vectors representing the sides of the triangle and the distance between the point and one of the triangle vertices
  const v0 = { x: triangle.x3 - triangle.x1, y: triangle.y3 - triangle.y1 };
  const v1 = { x: triangle.x2 - triangle.x1, y: triangle.y2 - triangle.y1 };
  const v2 = { x: point.x - triangle.x1, y: point.y - triangle.y1 };

  // dot products between the vectors
  const dot00 = v0.x * v0.x + v0.y * v0.y;
  const dot01 = v0.x * v1.x + v0.y * v1.y;
  const dot02 = v0.x * v2.x + v0.y * v2.y;
  const dot11 = v1.x * v1.x + v1.y * v1.y;
  const dot12 = v1.x * v2.x + v1.y * v2.y;

  // inverse of the denominator for use in barycentric coordinates
  const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

  // barycentric coordinates u and v
  const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

  // check if the point is inside the triangle using the barycentric coordinates
  return u >= 0 && v >= 0 && u + v <= 1;
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
