class Window {
  constructor(options) {
    if (!options || !options.canvas || !options.size) {
      throw "Window:: options doesn't exist";
    }

    this.size = options.size;
    this.click = false;

    this.canvas = options.canvas;
    this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio; // width * zoom
    this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio; // height * zoom
    this.ctx = this.canvas.getContext('2d');

    // angles of the sides adjacent to the width: 60 degress
    // angles of the sides adjacent to the height: 30 degress
    // the ratio is 1.72
    this.tile = { height: 30, clientHeight: 30 };
    this.tile.width = this.tile.height * 1.72;
    this.tile.clientWidth = this.tile.width * 1.72;

    this.draw = new Draw({ canvas: this.canvas, ctx: this.ctx });
    this.grid = new Grid({ size: this.size, tile: this.tile, draw: this.draw });

    this.grid.drawGrid();
  }
}

class Grid {
  constructor(options) {
    if (!options || !options.size || !options.tile || !options.draw) {
      throw `Grid:: options doesn't exist`;
    }

    this.size = options.size;
    this.tile = options.tile;
    this.draw = options.draw;

    // represents the initial position of the grid
    this.ini = {
      x: 0,
      y:
        (this.tile.height * Math.max(this.size.width, this.size.height)) / 2 -
        this.draw.canvas.height / 2
    };

    // represents the origin of the grid on the drawing canvas
    this.origin = {
      x: this.draw.canvas.width / 2 + this.tile.width / 2,
      y: this.tile.height
    };
  }

  // converts the Cartesian coordinates to isometric coordinates
  toIsometric(x, y) {
    return [x - y, (y + x) / 2];
  }

  drawGrid() {
    this.draw.clear();

    for (let x = 0; x < this.size.width; x++) {
      for (let y = 0; y < this.size.height; y++) {
        let [topX, topY] = this.toIsometric(x, y);
        topX = this.origin.x + topX * (this.tile.width / 2) - this.ini.x;
        topY = this.origin.y + topY * this.tile.height - this.ini.y;

        if (
          topX >= 0 &&
          topX <= this.draw.canvas.width + this.tile.width &&
          topY >= 0 &&
          topY <= this.draw.canvas.height + this.tile.height
        ) {
          // relative positions
          const halfWidth = this.tile.width / 2;
          const halfHeight = this.tile.height / 2;

          const x1 = topX - halfWidth;
          const y1 = topY - halfHeight;

          this.draw.path(
            x1,
            topY,
            topX - this.tile.width,
            y1,
            x1,
            topY - this.tile.height,
            topX,
            y1
          );
        }
      }
    }
  }
}

class Draw {
  constructor(options) {
    if (!options || !options.canvas || !options.ctx) {
      throw `Draw:: options doesn't exist`;
    }

    this.canvas = options.canvas;
    this.ctx = options.ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  path(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x3, y3);
    this.ctx.lineTo(x4, y4);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
