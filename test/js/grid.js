var MyGrid = ( function(window) {

	// Grid
	function Grid(el, width, height) {
		this.el = el;
		this.ctx = el.getContext("2d");
		this.width = width;
		this.height = height;
		this.tiles = {};
	}

	Grid.prototype.initialize = function(render) {
		for (var r = 0; r < this.height; r++) {
			this.tiles[r] = {};
			for (var c = 0; c < this.width; c++) {
				var t = new Tile(c, r, GRID_BG_COLORS[(c + r) % 2], this.ctx);
				this.tiles[r][c] = t;
			}
		}
	}

	Grid.prototype.draw = function() {
		for (var x in this.tiles) {
			for (var y in this.tiles[x]) {
				this.tiles[x][y].render('draw');
			}	
		}
	}

	Grid.prototype.clear = function() {
		this.ctx.clearRect(0, 0, this.el.width, this.el.height);
	}

	Grid.prototype.save = function() {
		console.log(this.el.toDataURL());
	}

	// Tile
	function Tile(x, y, color, ctx) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.empty = true;
		this.ctx = ctx;
	}

	Tile.prototype.render = function(action) {
		if (action == 'draw') {
			this.draw();
		} else if (action == 'erase') {
			console.log("Tile.render w/ 'erase' called");
			this.erase();
		}
	};

	Tile.prototype.draw = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
	};

	Tile.prototype.erase = function() {
		this.ctx.clearRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
	};	

	return {
		grid: Grid
	}

})( window );