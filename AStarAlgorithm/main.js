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
    this.openDraw = false;
    this.isDrawing = false;

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
      this.handleCanvasClick(e);
    });

    this.canvas.addEventListener('mousedown', e => {
      this.handleCanvasMousedown(e);
    });

    this.canvas.addEventListener('mousemove', e => {
      this.handleCanvasMousemove(e);
    });

    this.canvas.addEventListener('mouseup', () => {
      this.handleCanvasMouseup();
    });

    this.startButton.addEventListener('click', () => {
      this.setStart();
    });

    this.goalButton.addEventListener('click', () => {
      this.setGoal();
    });

    this.drawButton.addEventListener('click', () => {
      this.drawWall();
    });
  }

  setStart() {
    this.clickMode = 'start';
    this.startButton.classList.add('button--disabled');
  }

  setGoal() {
    this.clickMode = 'goal';
    this.goalButton.classList.add('button--disabled');
  }

  drawWall() {
    this.openDraw = !this.openDraw;
    this.drawButton.classList.toggle('button--disabled');

    if (this.openDraw) {
      this.clearCanvas();
      this.drawScene();
    } else {
      this.update();
    }
  }

  setWall(x, y) {
    const tileX = Math.floor(x / this.tileSize);
    const tileY = Math.floor(y / this.tileSize);

    if (tileX >= 0 && tileX < this.columns && tileY >= 0 && tileY < this.rows) {
      this.scene[tileY][tileX].type = 1;
      this.clearCanvas();
      this.drawScene();
    }
  }

  handleCanvasMousedown(e) {
    if (!this.openDraw) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.isDrawing = true;
    this.setWall(x, y);
  }

  handleCanvasMousemove(e) {
    if (!this.openDraw || !this.isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.setWall(x, y);
  }

  handleCanvasMouseup() {
    this.isDrawing = false;
  }

  handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedTile = this.getClickedTile(mouseX, mouseY);

    if (this.clickMode === 'start') {
      this.start = clickedTile;
      this.start.type = 0;
      this.startButton.classList.remove('button--disabled');
    } else if (this.clickMode === 'goal') {
      this.goal = clickedTile;
      this.goal.type = 0;
      this.goalButton.classList.remove('button--disabled');
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
    if (this.isOver || this.openDraw) return;

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

    if (!this.openDraw) {
      this.algorithm.draw();
      this.route.forEach(tile => tile.draw(this.bgRoute));
    }

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

    this.diagonalCost = 1; // square 2
    this.straightCost = 1;

    this.init();
  }

  update() {
    if (this.map.getOver() || this.openSet.length === 0) return;

    let currentTile = this.openSet[0];

    this.openSet.forEach(tile => {
      if (
        tile.f < currentTile.f ||
        (tile.f === currentTile.f && tile.h < currentTile.h)
      )
        currentTile = tile;
    });

    this.closeSet.push(currentTile);
    this.removeOfOpenSet(currentTile);

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

    currentTile.neighbors.forEach(neighbor => {
      if (this.closeSet.includes(neighbor) || neighbor.type === 1) return;

      const inOpenSet = this.openSet.includes(neighbor);
      const tempG = currentTile.g + this.getDistance(currentTile, neighbor);

      if (!inOpenSet || tempG < neighbor.g) {
        neighbor.g = tempG;
        neighbor.parent = currentTile;

        if (!inOpenSet) {
          neighbor.h = this.getDistance(neighbor, this.map.getGoal());
          neighbor.f = neighbor.g + neighbor.h;
          this.openSet.push(neighbor);
        }
      }
    });
  }

  getDistance(obj1, obj2) {
    const dist = [Math.abs(obj1.x - obj2.x), Math.abs(obj1.y - obj2.y)];
    const lowest = Math.min(dist.x, dist.y);
    const highest = Math.max(dist.x, dist.y);
    const horizontalMovesRequired = highest - lowest;
    return lowest * 14 + horizontalMovesRequired * 10;
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
    const { x, y, neighbors } = obj;
    const rows = this.scene.length;
    const cols = this.scene[0].length;

    // horizontal y vertical
    if (x > 0) neighbors.push(this.scene[y][x - 1]); // left
    if (x < cols - 1) neighbors.push(this.scene[y][x + 1]); // right
    if (y > 0) neighbors.push(this.scene[y - 1][x]); // top
    if (y < rows - 1) neighbors.push(this.scene[y + 1][x]); // bottom

    // diagonals
    if (x > 0 && y > 0) neighbors.push(this.scene[y - 1][x - 1]); // top-left
    if (x > 0 && y < rows - 1) neighbors.push(this.scene[y + 1][x - 1]); // bottom-left
    if (x < cols - 1 && y > 0) neighbors.push(this.scene[y - 1][x + 1]); // top-right
    if (x < cols - 1 && y < rows - 1) neighbors.push(this.scene[y + 1][x + 1]); // bottom-right
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
