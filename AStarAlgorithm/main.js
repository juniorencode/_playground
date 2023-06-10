const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const rowsElement = document.querySelector('#rows');
const columnsElement = document.querySelector('#columns');
const sizeElement = document.querySelector('#size');
const speedElement = document.querySelector('#speed');
const startButton = document.querySelector('#start');
const goalButton = document.querySelector('#goal');
const drawButton = document.querySelector('#draw');
const randomButton = document.querySelector('#random');
const clearButton = document.querySelector('#clear');

// Scene
const columns = 30;
const rows = 30;
let scene;

// tiles
const widthTile = parseInt(canvas.width / columns);
const heightTile = parseInt(canvas.height / rows);
const bgFillTile = '#000';
const bgEmptyTile = '#ccc';
const bgOpenSetTile = '#2e7d32';
const bgCloseSetTile = '#c62828';
const bgRouteTitle = '#4dd0e1';

// route
const openSet = [];
const closeSet = [];
const route = [];
let start, finish;
let isOver = false;

// objects
class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = Math.floor(Math.random() * 5) === 1 ? 1 : 0; // 0: empty, 1: fill
    this.color = this.type === 1 ? bgFillTile : bgEmptyTile;
    this.f = 0; // total cost (g+h)
    this.g = 0; // steps done
    this.h = 0; // heuristics (estimate of what remains)
    this.parent = null;
    this.neighbors = [];
  }

  getNeighbors() {
    if (this.x > 0) this.neighbors.push(scene[this.y][this.x - 1]); // right
    if (this.x < rows - 1) this.neighbors.push(scene[this.y][this.x + 1]); // left
    if (this.y > 0) this.neighbors.push(scene[this.y - 1][this.x]); // up
    if (this.y < columns - 1) this.neighbors.push(scene[this.y + 1][this.x]); // down
  }

  draw(color) {
    ctx.fillStyle = color;
    ctx.fillRect(
      this.x * widthTile,
      this.y * heightTile,
      widthTile,
      heightTile
    );
  }
}

// helper functions
const heuristic = (obj1, obj2) => {
  const x = Math.abs(obj1.x - obj2.x);
  const y = Math.abs(obj1.y - obj2.y);

  return x + y;
};

const create2DArray = () => {
  const obj = new Array(rows);

  for (let i = 0; i < rows; i++) {
    obj[i] = new Array(columns);
  }

  return obj;
};

const removeOfArray = (array, obj) => {
  const index = array.indexOf(obj);
  if (index !== -1) {
    array.splice(index, 1);
  }
};

const drawScene = () => {
  scene.map(row => {
    row.map(box => {
      box.draw(box.color);
    });
  });

  openSet.map(box => box.draw(bgOpenSetTile));
  closeSet.map(box => box.draw(bgCloseSetTile));
  route.map(box => box.draw(bgRouteTitle));
};

const clearScene = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const algorithm = () => {
  if (isOver || openSet.length === 0) return;

  let indexWinner = 0;

  openSet.map((box, i) => {
    if (box.f < openSet[indexWinner].f) indexWinner = i;
  });

  const current = openSet[indexWinner];

  if (current === finish) {
    let temp = current;
    route.push(temp);

    while (temp.parent) {
      temp = temp.parent;
      route.push(temp);
    }

    isOver = true;
    return;
  }

  removeOfArray(openSet, current);
  closeSet.push(current);

  current.neighbors.map(neighbor => {
    if (!closeSet.includes(neighbor) && neighbor.type != 1) {
      const tempG = current.g + 1;

      if (openSet.includes(neighbor)) {
        if (tempG < neighbor.g) {
          neighbor.g = tempG;
        }
      } else {
        neighbor.g = tempG;
        openSet.push(neighbor);
      }

      neighbor.h = heuristic(neighbor, finish);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.parent = current;
    }
  });
};

// looping
const loop = () => {
  clearScene();
  drawScene();
  algorithm();
  requestAnimationFrame(loop);
};

const init = () => {
  scene = create2DArray();

  // add box
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      scene[i][j] = new Box(j, i);
    }
  }

  // add neighbors
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      scene[i][j].getNeighbors();
    }
  }

  start = scene[0][0];
  finish = scene[rows - 1][columns - 1];
  openSet.push(start);

  loop();
};

init();