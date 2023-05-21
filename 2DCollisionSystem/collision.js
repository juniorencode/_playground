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
  return collisionRectangleWithRectangle({ ...point, w: 0, h: 0 }, rectangle);
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

const segmentsIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  // directions of the segments
  const d1 = direction(x1, y1, x2, y2, x3, y3);
  const d2 = direction(x1, y1, x2, y2, x4, y4);
  const d3 = direction(x3, y3, x4, y4, x1, y1);
  const d4 = direction(x3, y3, x4, y4, x2, y2);

  // check if the segments intersect
  return (
    ((d1 < 0 && d2 > 0) || (d1 > 0 && d2 < 0)) &&
    ((d3 < 0 && d4 > 0) || (d3 > 0 && d4 < 0))
  );
};

const direction = (x1, y1, x2, y2, x3, y3) => {
  // direction of point (x3, y3) with respect to the segment (x1, y1) - (x2, y2)
  return (x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1);
};

const collisionTriangleWithTriangle = (triangle1, triangle2) => {
  // check collision between the three segments of the triangles
  if (
    segmentsIntersect(
      triangle1.x1,
      triangle1.y1,
      triangle1.x2,
      triangle1.y2,
      triangle2.x1,
      triangle2.y1,
      triangle2.x2,
      triangle2.y2
    ) ||
    segmentsIntersect(
      triangle1.x1,
      triangle1.y1,
      triangle1.x2,
      triangle1.y2,
      triangle2.x2,
      triangle2.y2,
      triangle2.x3,
      triangle2.y3
    ) ||
    segmentsIntersect(
      triangle1.x2,
      triangle1.y2,
      triangle1.x3,
      triangle1.y3,
      triangle2.x1,
      triangle2.y1,
      triangle2.x2,
      triangle2.y2
    ) ||
    segmentsIntersect(
      triangle1.x2,
      triangle1.y2,
      triangle1.x3,
      triangle1.y3,
      triangle2.x2,
      triangle2.y2,
      triangle2.x3,
      triangle2.y3
    ) ||
    segmentsIntersect(
      triangle1.x3,
      triangle1.y3,
      triangle1.x1,
      triangle1.y1,
      triangle2.x1,
      triangle2.y1,
      triangle2.x2,
      triangle2.y2
    ) ||
    segmentsIntersect(
      triangle1.x3,
      triangle1.y3,
      triangle1.x1,
      triangle1.y1,
      triangle2.x2,
      triangle2.y2,
      triangle2.x3,
      triangle2.y3
    )
  ) {
    return true;
  }

  // check if one triangle is completely contained in the other
  if (
    collisionPointInTriangle({ x: triangle1.x1, y: triangle1.y1 }, triangle2) ||
    collisionPointInTriangle({ x: triangle1.x2, y: triangle1.y2 }, triangle2) ||
    collisionPointInTriangle({ x: triangle1.x3, y: triangle1.y3 }, triangle2) ||
    collisionPointInTriangle({ x: triangle2.x1, y: triangle2.y1 }, triangle1) ||
    collisionPointInTriangle({ x: triangle2.x2, y: triangle2.y2 }, triangle1) ||
    collisionPointInTriangle({ x: triangle2.x3, y: triangle2.y3 }, triangle1)
  ) {
    return true;
  }

  return false;
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

const segmentIntersectsRectangle = (x1, y1, x2, y2, rx, ry, rw, rh) => {
  // check if the segment intersects with any of the four edges of the rectangle
  return (
    segmentsIntersect(x1, y1, x2, y2, rx, ry, rx + rw, ry) ||
    segmentsIntersect(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh) ||
    segmentsIntersect(x1, y1, x2, y2, rx + rw, ry + rh, rx, ry + rh) ||
    segmentsIntersect(x1, y1, x2, y2, rx, ry + rh, rx, ry)
  );
};

const collisionRectangleWithTriangle = (rectangle, triangle) => {
  return (
    segmentIntersectsRectangle(
      triangle.x1,
      triangle.y1,
      triangle.x2,
      triangle.y2,
      rectangle.x,
      rectangle.y,
      rectangle.w,
      rectangle.h
    ) ||
    segmentIntersectsRectangle(
      triangle.x2,
      triangle.y2,
      triangle.x3,
      triangle.y3,
      rectangle.x,
      rectangle.y,
      rectangle.w,
      rectangle.h
    ) ||
    segmentIntersectsRectangle(
      triangle.x3,
      triangle.y3,
      triangle.x1,
      triangle.y1,
      rectangle.x,
      rectangle.y,
      rectangle.w,
      rectangle.h
    )
  );
};

const segmentIntersectsCircle = (x1, y1, x2, y2, cx, cy, radius) => {
  // length and direction of the segment
  const segmentLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const segmentDirectionX = (x2 - x1) / segmentLength;
  const segmentDirectionY = (y2 - y1) / segmentLength;

  // calculate the projected point on the segment
  const projectedPointOnSegment =
    (cx - x1) * segmentDirectionX + (cy - y1) * segmentDirectionY;

  // check if the projected point is outside the segment
  if (projectedPointOnSegment < 0 || projectedPointOnSegment > segmentLength)
    return false;

  const projectedPointX = x1 + projectedPointOnSegment * segmentDirectionX;
  const projectedPointY = y1 + projectedPointOnSegment * segmentDirectionY;

  // distance between the projected point and the center of the circle
  const distanceToPoint = Math.sqrt(
    (projectedPointX - cx) ** 2 + (projectedPointY - cy) ** 2
  );

  return distanceToPoint <= radius;
};

const collisionCircleWithTriangle = (circle, triangle) => {
  // check if the center of the circle is inside the triangle
  // check if any of the vertices are inside the circle
  if (
    collisionPointInTriangle({ x: circle.x, y: circle.y }, triangle) ||
    collisionPointInCircle({ x: triangle.x1, y: triangle.y1 }, circle) ||
    collisionPointInCircle({ x: triangle.x2, y: triangle.y2 }, circle) ||
    collisionPointInCircle({ x: triangle.x3, y: triangle.y3 }, circle)
  )
    return true;

  // check if the circle intersects with any side of the triangle
  return (
    segmentIntersectsCircle(
      triangle.x1,
      triangle.y1,
      triangle.x2,
      triangle.y2,
      circle.x,
      circle.y,
      circle.r
    ) ||
    segmentIntersectsCircle(
      triangle.x2,
      triangle.y2,
      triangle.x3,
      triangle.y3,
      circle.x,
      circle.y,
      circle.r
    ) ||
    segmentIntersectsCircle(
      triangle.x3,
      triangle.y3,
      triangle.x1,
      triangle.y1,
      circle.x,
      circle.y,
      circle.r
    )
  );
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

const checkTrianglesWithTriangles = () => {
  let collision = false;

  triangles.map((triangle1, i) => {
    triangles.map((triangle2, j) => {
      if (i !== j) {
        if (collisionTriangleWithTriangle(triangle1, triangle2)) {
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

const checkRectanglesWithTriangles = () => {
  let collision = false;
  rectangles.map(rectangle => {
    triangles.map(triangle => {
      if (collisionRectangleWithTriangle(rectangle, triangle)) {
        collision = true;
      }
    });
  });

  return collision;
};

const checkCirclesWithTriangles = () => {
  let collision = false;
  circles.map(circle => {
    triangles.map(triangle => {
      if (collisionCircleWithTriangle(circle, triangle)) {
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
    checkRectanglesWithCircles() ||
    checkTrianglesWithTriangles() ||
    checkRectanglesWithTriangles() ||
    checkCirclesWithTriangles()
  );
};
