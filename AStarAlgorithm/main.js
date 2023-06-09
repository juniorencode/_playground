const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

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
    this.type = 0;
    this.color = bgEmptyTile;
    this.f = 0; // total cost (g+h)
    this.g = 0; // steps done
    this.h = 0; // heuristics (estimate of what remains)
    this.parent = null;
    this.neighbors = [];

    if (Math.floor(Math.random() * 5) === 1) this.type = 1;
    if (this.type === 1) this.color = bgFillTile;
  }

  getNeighbors() {
    if (this.x > 0) this.neighbors.push(scene[this.y][this.x - 1]); // rigth
    if (this.x < rows - 1) this.neighbors.push(scene[this.y][this.x + 1]); // left
    if (this.y > 0) this.neighbors.push(scene[this.y - 1][this.x]); // up
    if (this.y < columns - 1) this.neighbors.push(scene[this.y + 1][this.x]); // down
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * widthTile,
      this.y * heightTile,
      widthTile,
      heightTile
    );
  }

  drawOpenSet() {
    ctx.fillStyle = bgOpenSetTile;
    ctx.fillRect(
      this.x * widthTile,
      this.y * heightTile,
      widthTile,
      heightTile
    );
  }

  drawCloseSet() {
    ctx.fillStyle = bgCloseSetTile;
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
  return array.filter(element => obj === element);
};

const drawScene = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      scene[i][j].draw();
    }
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].drawOpenSet();
  }

  for (let i = 0; i < closeSet.length; i++) {
    closeSet[i].drawCloseSet();
  }
};

const clearScene = () => {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

const algorithm = () => {
  if (isOver || openSet.length < 1) return;

  let indexWinner = 0;

  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[indexWinner].f) {
      indexWinner = i;
    }
  }

  const current = openSet[indexWinner];

  if (current === finish) {
    isOver = true;
    return;
  }
};

// looping
const loop = () => {
  clearScene();
  drawScene();
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
