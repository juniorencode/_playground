// objects
class Map {
  constructor() {
    this.references();
    this.scene = [];

    this.refresh();
    this.createScene();
    this.start = this.scene[0][0];
    this.goal = this.scene[this.rows - 1][this.columns - 1];

    this.clickMode = null;

    const map = {
      getOver: () => this.isOver,
      setOver: bool => (this.isOver = bool),
      getStart: () => this.start,
      getGoal: () => this.goal,
      pushRoute: tile => this.route.push(tile)
    };

    this.algorithm = new AStart(this.scene, map);

    this.update();

    this.randomButton.addEventListener('click', () => {
      this.randomScene();
    });

    this.clearButton.addEventListener('click', () => {
      this.clearScene();
    });

    this.canvas.addEventListener('click', e => {
      this.handleCanvas(e);
    });

    this.startButton.addEventListener('click', () => {
      this.setStart();
    });

    this.goalButton.addEventListener('click', () => {
      this.setGoal();
    });
  }

  setStart() {
    this.clickMode = 'start';
    this.startButton.disabled = true;
  }

  setGoal() {
    this.clickMode = 'goal';
    this.goalButton.disabled = true;
  }

  handleCanvas(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedTile = this.getClickedTile(mouseX, mouseY);

    if (this.clickMode === 'start') {
      this.start = clickedTile;
      this.start.type = 0;
      this.startButton.disabled = false;
    } else if (this.clickMode === 'goal') {
      this.goal = clickedTile;
      this.goal.type = 0;
      this.goalButton.disabled = false;
    }

    this.clickMode = null;

    this.route = [];
    this.isOver = false;

    this.algorithm.updateScene();
    this.update();
  }

  getClickedTile(mouseX, mouseY) {
    const tileX = Math.floor(mouseX / this.tileSize);
    const tileY = Math.floor(mouseY / this.tileSize);

    if (tileX >= 0 && tileX < this.columns && tileY >= 0 && tileY < this.rows) {
      return this.scene[tileY][tileX];
    }

    return null;
  }

  randomScene() {
    this.scene.forEach(row => {
      row.forEach(tile => {
        if (Math.floor(Math.random() * 10) === 1) tile.type = 1;
      });
    });

    this.start.type = 0;
    this.goal.type = 0;

    this.route = [];
    this.isOver = false;

    this.algorithm.updateScene();
    this.update();
  }

  clearScene() {
    this.scene.forEach(row => {
      row.forEach(tile => {
        tile.type = 0;
      });
    });

    this.route = [];
    this.isOver = false;

    this.algorithm.updateScene();
    this.update();
  }

  update() {
    if (this.isOver) return;

    for (let i = 0; i < this.speed; i++) {
      this.algorithm.update();
    }

    this.clearCanvas();
    this.drawScene();

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

  clearCanvas() {
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
    this.ctx.strokeStyle = '#000';
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

    this.bgTile = ['#bAb9bA', '#2a282a'];
    this.bgRoute = '#ac4042';
    this.bgStart = '#ff8f00';
    this.bgGoal = '#6200ea';
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
    this.bgOpenSet = '#4c9a4c';
    this.bgCloseSet = '#4f689d';

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

  init(ignoreNeighbors = false) {
    this.openSet = [];
    this.closeSet = [];
    this.openSet.push(this.map.getStart());

    this.scene.forEach(row => {
      row.forEach(tile => {
        tile.parent = null;
        tile.f = 0; // total cost (g+h)
        tile.g = 0; // steps done
        tile.h = 0; // heuristics (estimate of what remains)

        if (!ignoreNeighbors) {
          tile.neighbors = [];
          this.getNeighbors(tile);
        }
      });
    });
  }

  updateScene() {
    this.init(true);
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
