const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pacmanFrames = document.getElementById('animations');
const ghostFrames = document.getElementById('ghosts');

const DIRECTION_UP = 1;
const DIRECTION_RIGHT = 2;
const DIRECTION_BOTTOM = 3;
const DIRECTION_LEFT = 4;

const ghosts = [];
const ghostCount = 4;
const ghostLocations = [
  { x: 10, y: 9 },
  { x: 9, y: 11 },
  { x: 10, y: 11 },
  { x: 11, y: 11 }
];

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

const oneBlockSize = 18;
const wallSpaceWidth = oneBlockSize / 1.2;
const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
const wallInnerColor = 'black';

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

const createNewPacman = () => {
  pacman = new Pacman(
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize / 9
  );
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
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.fillText('SCORE: ' + score, 0, 2);
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const update = () => {
  pacman.moveProcess();
  pacman.eat();
};

const draw = () => {
  clearCanvas();
  drawScore();
  drawWalls();
  drawFoods();
  pacman.draw();
};

const loop = () => {
  update();
  draw();
  requestAnimationFrame(loop);
};

const init = () => {
  canvas.width = map[0].length * oneBlockSize;
  canvas.height = (map.length + 1) * oneBlockSize;

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
