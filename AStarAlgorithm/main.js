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

// objects
class Map {
  constructor() {
    this.references();
    this.scene = [];

    this.refresh();
    this.createScene();
    this.start = this.scene[0][0];
    this.goal = this.scene[this.rows - 1][this.columns - 1];

    const map = {
      getOver: () => this.isOver,
      setOver: bool => (this.isOver = bool),
      getGoal: () => this.goal,
      pushRoute: tile => this.route.push(tile)
    };

    this.algorithm = new AStart(this.scene, map);

    this.update();
  }

  update() {
    this.clearScene();
    this.drawScene();
    this.algorithm.update();

    requestAnimationFrame(() => {
      this.update();
    });
  }

  createScene() {
    const map = {
      ctx: this.ctx,
      rows: this.rows,
      columns: this.columns,
      tileSize: this.tileSize
    };

    this.scene = new Array(this.rows);

    for (let i = 0; i < this.rows; i++) {
      this.scene[i] = new Array(this.columns);

      for (let j = 0; j < this.columns; j++) {
        this.scene[i][j] = new Tile(j, i, map);
      }
    }
  }

  clearScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawScene() {
    this.scene.forEach(row => {
      row.forEach(tile => {
        tile.draw(this.bgTile[tile.type]);
      });
    });

    this.algorithm.draw();
    this.route.forEach(tile => tile.draw(this.bgRoute));

    this.start.draw(this.bgStart);
    this.goal.draw(this.bgGoal);

    this.drawGrid();
  }

  drawGrid() {
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;

    // rows
    for (let i = 0; i <= this.rows; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.tileSize);
      this.ctx.lineTo(this.canvas.width, i * this.tileSize);
      this.ctx.stroke();
    }

    // columns
    for (let i = 0; i <= this.columns; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.tileSize, 0);
      this.ctx.lineTo(i * this.tileSize, this.canvas.height);
      this.ctx.stroke();
    }
  }

  refresh() {
    this.rows = this.rowsElement.value || 10;
    this.columns = this.columnsElement.value || 10;
    this.tileSize = this.sizeElement.value || 20;
    this.speed = this.speedElement.value || 1;
    this.route = [];
    this.isOver = false;

    this.canvas.width = this.tileSize * this.columns;
    this.canvas.height = this.tileSize * this.rows;
  }

  references() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    this.rowsElement = document.querySelector('#rows');
    this.columnsElement = document.querySelector('#columns');
    this.sizeElement = document.querySelector('#size');
    this.speedElement = document.querySelector('#speed');
    this.startButton = document.querySelector('#start');
    this.goalButton = document.querySelector('#goal');
    this.drawButton = document.querySelector('#draw');
    this.randomButton = document.querySelector('#random');
    this.clearButton = document.querySelector('#clear');

    this.bgTile = ['#cfd8dc', '#37474f'];
    this.bgRoute = '#1565c0';
    this.bgStart = '#ff8f00 ';
    this.bgGoal = '#43a047';
  }
}

class Tile {
  constructor(x, y, map) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.type = 0; // 0: way, 1: wall
    this.parent = null;
  }

  draw(color) {
    this.map.ctx.fillStyle = color;
    this.map.ctx.fillRect(
      this.x * this.map.tileSize,
      this.y * this.map.tileSize,
      this.map.tileSize,
      this.map.tileSize
    );
  }
}

class AStart {
  constructor(scene, map) {
    this.scene = scene;
    this.map = map;
    this.openSet = [];
    this.closeSet = [];
    this.bgOpenSet = '#ab47bc';
    this.bgCloseSet = '#ef9a9a ';

    this.openSet.push(this.scene[0][0]);

    this.init();
  }

  update() {
    if (this.map.getOver() || this.openSet.length === 0) return;

    let currentTile = this.openSet[0];

    this.openSet.forEach(tile => {
      if (tile.f < currentTile.f) currentTile = tile;
    });

    if (currentTile === this.map.getGoal()) {
      let temp = currentTile;
      this.map.pushRoute(temp);

      while (temp.parent) {
        temp = temp.parent;
        this.map.pushRoute(temp);
      }

      this.map.setOver(true);
      return;
    }

    this.removeOfOpenSet(currentTile);
    this.closeSet.push(currentTile);

    currentTile.neighbors.forEach(neighbor => {
      if (!this.closeSet.includes(neighbor) && neighbor.type !== 1) {
        const tempG = currentTile.g + 1;

        if (this.openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          this.openSet.push(neighbor);
        }

        neighbor.h = this.heuristic(neighbor, this.map.getGoal());
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = currentTile;
      }
    });
  }

  init() {
    this.scene.forEach(row => {
      row.forEach(tile => {
        tile.neighbors = [];
        tile.f = 0; // total cost (g+h)
        tile.g = 0; // steps done
        tile.h = 0; // heuristics (estimate of what remains)
        this.getNeighbors(tile);
      });
    });
  }

  getNeighbors(obj) {
    if (obj.x > 0) obj.neighbors.push(this.scene[obj.y][obj.x - 1]); // right
    if (obj.x < this.scene.length - 1)
      obj.neighbors.push(this.scene[obj.y][obj.x + 1]); // left
    if (obj.y > 0) obj.neighbors.push(this.scene[obj.y - 1][obj.x]); // up
    if (obj.y < this.scene[0].length - 1)
      obj.neighbors.push(this.scene[obj.y + 1][obj.x]); // down
  }

  heuristic(obj1, obj2) {
    const x = Math.abs(obj1.x - obj2.x);
    const y = Math.abs(obj1.y - obj2.y);

    return x + y;
  }

  removeOfOpenSet(obj) {
    this.openSet = this.openSet.filter(tile => tile !== obj);
  }

  draw() {
    this.openSet.forEach(tile => tile.draw(this.bgOpenSet));
    this.closeSet.forEach(tile => tile.draw(this.bgCloseSet));
  }
}

new Map();
