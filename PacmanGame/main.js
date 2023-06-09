const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pacmanFrames = document.getElementById('animations');
const ghostFrames = document.getElementById('ghosts');

const DIRECTION_UP = 1;
const DIRECTION_RIGHT = 2;
const DIRECTION_BOTTOM = 3;
const DIRECTION_LEFT = 4;

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let animationId;
let stopGame = false;

const oneBlockSize = 18;
const wallSpaceWidth = oneBlockSize / 1.2;
const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
const wallInnerColor = 'black';

const totalFood = 210;
const totalLives = 3;
let lives = totalLives;

let ghosts = [];
const ghostLocations = [
  { x: 10, y: 8 },
  { x: 9, y: 10 },
  { x: 10, y: 10 },
  { x: 11, y: 10 }
];
const randomTargetsForGhosts = [
  { x: oneBlockSize, y: oneBlockSize },
  { x: 0, y: 10 * oneBlockSize },
  { x: oneBlockSize, y: 20 * oneBlockSize },
  { x: 19 * oneBlockSize, y: oneBlockSize },
  { x: 20 * oneBlockSize, y: 10 * oneBlockSize },
  { x: 19 * oneBlockSize, y: 20 * oneBlockSize }
];

let score = 0;
let pacman;

class Pacman {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.nextDirection = DIRECTION_RIGHT;
    this.frameCount = 7;
    this.currentFrame = 1;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  moveProcess() {
    if (this.x <= -oneBlockSize) this.x = (map.length - 1) * oneBlockSize;
    if (this.x >= map.length * oneBlockSize) this.x = -oneBlockSize;

    this.changeDirectionIfPossible();
    this.moveForwards();

    if (this.checkCollisions()) this.moveBackwards();
  }

  changeDirectionIfPossible() {
    if (this.direction === this.nextDirection) return;

    const tempDirection = this.direction;

    this.direction = this.nextDirection;
    this.moveForwards();

    if (this.checkCollisions()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  moveBackwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT: // right
        this.x -= this.speed;
        break;
      case DIRECTION_UP: // up
        this.y += this.speed;
        break;
      case DIRECTION_LEFT: // left
        this.x += this.speed;
        break;
      case DIRECTION_BOTTOM: // bottom
        this.y -= this.speed;
        break;
    }
  }

  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT: // right
        this.x += this.speed;
        break;
      case DIRECTION_UP: // up
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT: // left
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM: // bottom
        this.y += this.speed;
        break;
    }
  }

  checkCollisions() {
    const blockX = this.x / oneBlockSize;
    const blockY = this.y / oneBlockSize;

    if (
      map[parseInt(blockY)][parseInt(blockX)] == 1 ||
      map[parseInt(blockY + 0.9999)][parseInt(blockX)] == 1 ||
      map[parseInt(blockY)][parseInt(blockX + 0.9999)] == 1 ||
      map[parseInt(blockY + 0.9999)][parseInt(blockX + 0.9999)] == 1
    ) {
      return true;
    }

    return false;
  }

  eat() {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == 2 && this.getMapX() == j && this.getMapY() == i) {
          map[i][j] = 3;
          score++;
        }
      }
    }
  }

  getMapX() {
    return parseInt(this.x / oneBlockSize);
  }

  getMapY() {
    return parseInt(this.y / oneBlockSize);
  }

  checkGhostCollision(ghosts) {
    for (let i = 0; i < ghosts.length; i++) {
      let ghost = ghosts[i];
      if (
        ghost.getMapX() == this.getMapX() &&
        ghost.getMapY() == this.getMapY()
      ) {
        return true;
      }
    }

    return false;
  }

  draw() {
    const translateX = this.x + oneBlockSize / 2;
    const translateY = this.y + oneBlockSize + oneBlockSize / 2;

    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.rotate(((this.direction + DIRECTION_RIGHT) * 90 * Math.PI) / 180);
    ctx.translate(-translateX, -translateY);
    ctx.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * 16,
      0,
      16,
      16,
      this.x,
      this.y + oneBlockSize,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

class Ghost {
  constructor(x, y, width, height, speed, imageX, imageY, range) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.imageX = imageX;
    this.imageY = imageY;
    this.range = range;
    this.randomTargetIndex = parseInt(Math.random() * 6);
    this.target = randomTargetsForGhosts[this.randomTargetIndex];

    setInterval(() => {
      this.changeRandomDirection();
    }, 10000);
  }

  isInRange() {
    const xDistance = Math.abs(pacman.getMapX() - this.getMapX());
    const yDistance = Math.abs(pacman.getMapY() - this.getMapY());

    if (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
    ) {
      return true;
    }

    return false;
  }

  changeRandomDirection() {
    this.randomTargetIndex = parseInt(Math.random() * 6);
  }

  moveProcess() {
    if (this.isInRange()) {
      this.target = pacman;
    } else {
      this.target = randomTargetsForGhosts[this.randomTargetIndex];
    }

    this.changeDirectionIfPossible();
    this.moveForwards();
    if (this.checkCollisions()) {
      this.moveBackwards();
      return;
    }
  }

  changeDirectionIfPossible() {
    let tempDirection = this.direction;

    this.direction = this.calculateNewDirection(
      map,
      parseInt(this.target.x / oneBlockSize),
      parseInt(this.target.y / oneBlockSize)
    );

    if (typeof this.direction == 'undefined') {
      this.direction = tempDirection;
      this.changeRandomDirection();
      return;
    }

    this.moveForwards();

    if (this.checkCollisions()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  calculateNewDirection(map, destX, destY) {
    const mp = [];

    for (let i = 0; i < map.length; i++) {
      mp[i] = map[i].slice();
    }

    const queue = [
      {
        x: this.getMapX(),
        y: this.getMapY(),
        moves: []
      }
    ];

    while (queue.length > 0) {
      const poped = queue.shift();

      if (poped.x === destX && poped.y === destY) {
        return poped.moves[0];
      } else {
        mp[poped.y][poped.x] = 1;
        const neighborList = this.addNeighbors(poped, mp);
        for (let i = 0; i < neighborList.length; i++) {
          queue.push(neighborList[i]);
        }
      }
    }

    return DIRECTION_UP; // default
  }

  addNeighbors(poped, mp) {
    const queue = [];
    const numOfRows = mp.length;
    const numOfColumns = mp[0].length;

    if (
      poped.x - 1 >= 0 &&
      poped.x - 1 < numOfRows &&
      mp[poped.y][poped.x - 1] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_LEFT);
      queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
    }

    if (
      poped.x + 1 >= 0 &&
      poped.x + 1 < numOfRows &&
      mp[poped.y][poped.x + 1] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_RIGHT);
      queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
    }

    if (
      poped.y - 1 >= 0 &&
      poped.y - 1 < numOfColumns &&
      mp[poped.y - 1][poped.x] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_UP);
      queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
    }

    if (
      poped.y + 1 >= 0 &&
      poped.y + 1 < numOfColumns &&
      mp[poped.y + 1][poped.x] != 1
    ) {
      const tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_BOTTOM);
      queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
    }

    return queue;
  }

  getMapX() {
    return parseInt(this.x / oneBlockSize);
  }

  getMapY() {
    return parseInt(this.y / oneBlockSize);
  }

  moveBackwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT: // right
        this.x -= this.speed;
        break;
      case DIRECTION_UP: // up
        this.y += this.speed;
        break;
      case DIRECTION_LEFT: // left
        this.x += this.speed;
        break;
      case DIRECTION_BOTTOM: // bottom
        this.y -= this.speed;
        break;
    }
  }

  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT: // right
        this.x += this.speed;
        break;
      case DIRECTION_UP: // up
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT: // left
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM: // bottom
        this.y += this.speed;
        break;
    }
  }

  checkCollisions() {
    const blockX = this.x / oneBlockSize;
    const blockY = this.y / oneBlockSize;

    if (
      map[parseInt(blockY)][parseInt(blockX)] == 1 ||
      map[parseInt(blockY + 0.9999)][parseInt(blockX)] == 1 ||
      map[parseInt(blockY)][parseInt(blockX + 0.9999)] == 1 ||
      map[parseInt(blockY + 0.9999)][parseInt(blockX + 0.9999)] == 1
    ) {
      return true;
    }

    return false;
  }

  draw() {
    ctx.save();
    ctx.drawImage(
      ghostFrames,
      this.imageX,
      this.imageY,
      16,
      16,
      this.x,
      this.y + oneBlockSize,
      this.width,
      this.height
    );
    ctx.restore();

    // circle range
    // ctx.beginPath();
    // ctx.strokeStyle = 'red';
    // ctx.arc(
    //   this.x + oneBlockSize / 2,
    //   this.y + oneBlockSize / 2 + oneBlockSize,
    //   this.range * oneBlockSize,
    //   0,
    //   2 * Math.PI
    // );
    // ctx.stroke();
  }
}

const createNewPacman = () => {
  pacman = new Pacman(
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize / 9
  );
};

const createGhosts = () => {
  ghosts = [];

  // red ghost
  const redGhost = new Ghost(
    ghostLocations[0].x * oneBlockSize,
    ghostLocations[0].y * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    pacman.speed / 2,
    0,
    0,
    8
  );
  ghosts.push(redGhost);

  // pink ghost
  const pinkGhost = new Ghost(
    ghostLocations[0].x * oneBlockSize,
    ghostLocations[0].y * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    pacman.speed / 2,
    32,
    0,
    6
  );
  ghosts.push(pinkGhost);

  // orange ghost
  const orangeGhost = new Ghost(
    ghostLocations[0].x * oneBlockSize,
    ghostLocations[0].y * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    pacman.speed / 2,
    16,
    0,
    3
  );
  ghosts.push(orangeGhost);

  // skyblue ghost
  const skyblueGhost = new Ghost(
    ghostLocations[0].x * oneBlockSize,
    ghostLocations[0].y * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    pacman.speed / 2,
    48,
    0,
    2
  );
  ghosts.push(skyblueGhost);
};

const restartPacmanAndGhosts = () => {
  createNewPacman();
  createGhosts();
};

const onGhostCollision = () => {
  lives--;
  restartPacmanAndGhosts();
  if (lives === 0) gameOver();
};

const gameOver = () => {
  cancelAnimationFrame(animationId);
  stopGame = true;
  drawGameOver();
};

const win = () => {
  cancelAnimationFrame(animationId);
  stopGame = true;
  drawWin();
};

const createRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y + oneBlockSize, width, height);
};

const drawWalls = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 1) {
        createRect(
          j * oneBlockSize,
          i * oneBlockSize,
          oneBlockSize,
          oneBlockSize,
          '#342DCA'
        );

        if (j > 0 && map[i][j - 1] == 1) {
          createRect(
            j * oneBlockSize,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
          );
        }

        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
          createRect(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
          );
        }

        if (i < map.length - 1 && map[i + 1][j] == 1) {
          createRect(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
          );
        }

        if (i > 0 && map[i - 1][j] == 1) {
          createRect(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
          );
        }
      }
    }
  }
};

const drawFoods = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 2) {
        createRect(
          j * oneBlockSize + oneBlockSize / 2,
          i * oneBlockSize + oneBlockSize / 2,
          oneBlockSize / 6,
          oneBlockSize / 6,
          '#FEB897'
        );
      }
    }
  }
};

const drawScore = () => {
  ctx.font = '10px Emulogic';
  ctx.textAlign = 'start';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.fillText('SCORE: ' + score, 0, 2);
};

const drawLives = () => {
  const pointStart = canvas.width - totalLives * oneBlockSize;

  ctx.font = '10px Emulogic';
  ctx.textAlign = 'end';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.fillText('Lives: ', pointStart, 2);

  // lives
  for (let i = 0; i < lives; i++) {
    ctx.drawImage(
      pacmanFrames,
      2 * 16,
      0,
      16,
      16,
      pointStart + i * oneBlockSize,
      0,
      12,
      12
    );
  }
};

const drawGameOver = () => {
  ctx.font = '20px Emulogic';
  ctx.textAlign = 'start';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';

  const text = ctx.measureText('GAME OVER');
  const x = (canvas.width - text.width) / 2;
  const y = (canvas.height - 20) / 2;
  ctx.fillText('GAME OVER', x, y);
};

const drawWin = () => {
  ctx.font = '20px Emulogic';
  ctx.textAlign = 'start';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';

  const text = ctx.measureText('YOU WIN');
  const x = (canvas.width - text.width) / 2;
  const y = (canvas.height - 20) / 2;
  ctx.fillText('YOU WIN', x, y);
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const update = () => {
  pacman.moveProcess();
  pacman.eat();
  ghosts.forEach(ghost => ghost.moveProcess());
  if (pacman.checkGhostCollision(ghosts)) onGhostCollision();

  if (score >= totalFood) {
    win();
  }
};

const draw = () => {
  clearCanvas();
  drawScore();
  drawLives();
  drawWalls();
  drawFoods();
  pacman.draw();
  ghosts.forEach(ghost => ghost.draw());
};

const loop = () => {
  draw();
  update();
  if (stopGame) return;
  animationId = requestAnimationFrame(loop);
};

const init = () => {
  canvas.width = map[0].length * oneBlockSize;
  canvas.height = (map.length + 1) * oneBlockSize;

  createNewPacman();
  createGhosts();
  animationId = requestAnimationFrame(loop);
};

init();

window.addEventListener('keydown', e => {
  const key = e.key;

  if (key === 'w') pacman.nextDirection = DIRECTION_UP; // up
  else if (key === 'd') pacman.nextDirection = DIRECTION_RIGHT; // right
  else if (key === 's') pacman.nextDirection = DIRECTION_BOTTOM; // bottom
  else if (key === 'a') pacman.nextDirection = DIRECTION_LEFT; // left
});
