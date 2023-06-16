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
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const oneBlockSize = 18;
const wallSpaceWidth = oneBlockSize / 1.2;
const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
const wallInnerColor = 'black';

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
    this.changeDirectionIfPossible();
    this.moveForwards();
  }

  changeDirectionIfPossible() {
    if (this.direction === this.nextDirection) return;

    this.direction = this.nextDirection;
    this.moveForwards();
  }

  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT: // Right
        this.x += this.speed;
        break;
      case DIRECTION_UP: // Up
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT: // Left
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM: // Bottom
        this.y += this.speed;
        break;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x + oneBlockSize / 2, this.y + oneBlockSize / 2);
    ctx.rotate(((this.direction + DIRECTION_RIGHT) * 90 * Math.PI) / 180);
    ctx.translate(-this.x - oneBlockSize / 2, -this.y - oneBlockSize / 2);
    ctx.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * 20,
      0,
      20,
      20,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

let createNewPacman = () => {
  pacman = new Pacman(
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize / 5
  );
};

const createRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
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

const update = () => {
  pacman.moveProcess();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const draw = () => {
  clearCanvas();
  drawWalls();
  pacman.draw();
};

const loop = () => {
  update();
  draw();
  requestAnimationFrame(loop);
};

const init = () => {
  canvas.width = map[0].length * oneBlockSize;
  canvas.height = map.length * oneBlockSize;

  createNewPacman();
  loop();
};

init();

window.addEventListener('keydown', e => {
  const key = e.key;

  if (key === 'w') pacman.nextDirection = DIRECTION_UP; // up
  else if (key === 'd') pacman.nextDirection = DIRECTION_RIGHT; // right
  else if (key === 's') pacman.nextDirection = DIRECTION_BOTTOM; // bottom
  else if (key === 'a') pacman.nextDirection = DIRECTION_LEFT; // left
});
