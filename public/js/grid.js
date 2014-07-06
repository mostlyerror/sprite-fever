var MyGrid = ( function() {

	// Grid
	function Grid(el, width, height, scale) {
		this.el     = el;
		this.ctx    = el.getContext("2d");
		this.width  = width; // x units not pixel width
		this.height = height; // y units not pixel height
		this.scale  = scale;
		this.tiles  = {};
	}

	Grid.prototype.init = function() {
		for (var r = 0; r < this.height; r++) {
			this.tiles[r] = {};
			for (var c = 0; c < this.width; c++) {
				var t = new Tile(c, r, GRID_BG_COLORS[(c + r) % 2], this.ctx, this.scale);
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

	// Tile
	function Tile(x, y, color, ctx, scale) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.empty = true;
		this.ctx = ctx;
		this.scale = scale;
	}

	Tile.prototype.render = function(action) {
		if (action == 'draw') {
			this.draw();
		} else if (action == 'erase') {
			this.erase();
		}
	};

	Tile.prototype.draw = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x * this.scale, this.y * this.scale, this.scale, this.scale);
	};

	Tile.prototype.erase = function() {
		this.ctx.clearRect(this.x * this.scale, this.y * this.scale, this.scale, this.scale);
	};	

	return {
		grid: Grid
	}

})( );

