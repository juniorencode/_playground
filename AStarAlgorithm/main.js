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

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * widthTile,
      this.y * heightTile,
      widthTile,
      heightTile
    );
  }
}

// helper functions
const create2DArray = () => {
  const obj = new Array(rows);

  for (let i = 0; i < rows; i++) {
    obj[i] = new Array(columns);
  }

  return obj;
};

const drawScene = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // console.log(scene[i][j]);
      scene[i][j].draw();
    }
  }
};

// looping
const loop = () => {
  drawScene();
  requestAnimationFrame(loop);
};

const init = () => {
  scene = create2DArray();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      scene[i][j] = new Box(j, i);
    }
  }

  console.log(heightTile);

  loop();
};

init();
