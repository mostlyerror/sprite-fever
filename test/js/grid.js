var MyGrid = ( function(window) {
	function Grid(el, width, height) {
		this.el = el;
		this.ctx = el.getContext("2d");
		this.width = width;
		this.height = height;
		this.tiles = {};
	}

	Grid.prototype.initialize = function(render) {
		// create empty Tile objects
		for (var r = 0; r < this.height; r++) {
			this.tiles[r] = {};
			for (var c = 0; c < this.width; c++) {
				if (render) {
					var t = new Tile(c, r, GRID_BG_COLORS[(c + r) % 2], this.ctx);
					this.tiles[r][c] = t;
					t.render();
				} else {
					var t = new Tile(c, r, null, this.ctx);
					this.tiles[r][c] = t;
				}
			}
		}
	}

	Grid.prototype.clear = function() {
		this.ctx.clearRect(0, 0, this.el.width, this.el.height);
	}

	Grid.prototype.save = function() {
		console.log(this.el.toDataURL());
	}

	function Tile(x, y, color, ctx) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.empty = true;
		this.ctx = ctx;
	}

	Tile.prototype.render = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(
			this.x * TILE_SIZE, 
			this.y * TILE_SIZE, 
			TILE_SIZE, 
			TILE_SIZE);
	}; 	

	return {
		grid: Grid
	}
})( window );

