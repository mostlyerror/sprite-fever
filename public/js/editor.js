
const TILE_SIZE = 30;
const GRID_X = 16;
const GRID_Y = 20;
const NUM_SWATCHES = 9;
const SWATCH_LIGHTNESS_STEP = Math.ceil(255 / NUM_SWATCHES); //29 for 9 picker-swatches;
const LIGHT_GREY  = 'rgba(200, 200, 200, 1)';
const WHITE = 'rgba(255, 255, 255, 1)';
const GRID_BG_COLORS = [LIGHT_GREY, WHITE];

$(document).ready(function() {

	var overlay = document.getElementById("overlay");
	var bg      = document.getElementById("bg");
	var preview = document.getElementById("preview");
	var palette = document.getElementById("canvas-color-palette");

	bg.width    = overlay.width  = TILE_SIZE * GRID_X;
	bg.height   = overlay.height = TILE_SIZE * GRID_Y;
	preview.width  = TILE_SIZE * GRID_X;
	preview.height = TILE_SIZE * GRID_Y;
	palette.width = TILE_SIZE * 9;
	palette.height = TILE_SIZE * 4;

	var picker    = document.getElementById("color-picker-canvas");
	var pickerCTX = picker.getContext("2d");
	var pickerSwatches  = document.querySelectorAll('.picker-swatch');
	var pickerSwatchParent = document.querySelector('.picker-swatch').parentNode;

	// adjust size of picker & picker-swatches
	picker.width  = $(picker.parentNode).width();
	picker.height = 255;
	$(pickerSwatches).width($(pickerSwatchParent).width() / pickerSwatches.length);
	
	var colorMap = new Image();
	colorMap.onload = function() {
		pickerCTX.drawImage(colorMap, 0, 0, picker.width, picker.height);
	};
	colorMap.crossOrigin = "anonymous"; // CORS bullshit
	// colorMap.src = "http://localhost:8000/images/map-saturation.png"; // CORS bullshit
	colorMap.src = "/images/map-saturation.png"; // CORS bullshit
	var colorPickerData = pickerCTX.getImageData(0, 0, picker.width, picker.height);

	// Color Variables
	var selectedColor = 'rgba(0,0,0,1)';
	var colorCounter = 0;

	var $bg      = $(bg);
	var $overlay = $(overlay);
	var $picker  = $(picker);
	var $preview = $(preview);
	var $palette = $(palette);
	var $name    = $('#name-input');
	var $clear   = $("#button-clear");

	var showing = false;
	var fadeTimer;
	var $callout = $('.callout');
	var $calloutText = $('.callout-text');
	var $helper  = $('.help-bob');
	var $jiggy = $("#button-add-moves");

	var Grid = MyGrid.grid;
	var bgGrid = new Grid(bg, GRID_X, GRID_Y, 30);
	var oGrid  = new Grid(overlay, GRID_X, GRID_Y, 30);
	var pGrid  = new Grid(preview, GRID_X, GRID_Y, 13);
	var cGrid  = new Grid(palette, 9, 4, 30);

	// instruction callouts
	$palette.on('mouseover', null, {str: 'Use the Palette to store colors you like.'}, callout);
	$picker.on('mouseover', null, {str:  'Click on the Color Picker to select a color.'}, callout);
	$overlay.on('mouseover', null, {str: 'Have at it, Pixel Picasso!'}, callout);
	$preview.on('mouseover', null, {str: 'Get a sneak Preview of your sprite.'}, callout);
	$helper.on('mouseover', null, {str: 'Watch it! Hands to yourself!'}, callout);
	$clear.on('mouseover', null, {str: 'Wipe the slate clean.'}, callout);
	$jiggy.on('mouseover', null, {str: 'Awww yeaa boyee!'}, callout);

	function callout(e) {
		$calloutText.html(e.data.str);
		bounceBob();
	}

	function bounceBob() {
		if (Math.random() > 0.5) {
			$helper
			.animate({top: '-3px', left: '-2px'}, 100)
			.animate({top: '0px', left: '0px'}, 50)
			
		} else {
			$helper
			.animate({top: '-3px', left: '2px'}, 100)
			.animate({top: '0px', left: '0px'}, 50);
		}
	}

	// listeners
	$('#button-clear').on('click', function(e) {
		oGrid.clear();
		pGrid.clear();
	});

	$('.picker-swatch').on('click', function(e) {
		selectedColor = $(this).css('background-color');
	});

	$palette.on('click', function(e) {
		drawTile(getTile(e, cGrid), 'draw');
	});

	$picker.on('click', function(e) {
		selectedColor = getPixelColor(e.offsetX, e.offsetY);
		updateSwatches();
	});

	$overlay.on('contextmenu', function(e) {
		e.preventDefault();
		drawTile(getTile(e, oGrid), 'erase');
		drawTile(getTile(e, pGrid), 'erase');
	});

	$overlay.on('mousedown', function(e) {
		e.preventDefault();

		var tile  = getTile(e, oGrid);
		var pTile = pGrid.tiles[tile.y][tile.x];
		drawTile(tile, 'draw');
		drawTile(pTile, 'draw');

		$(this).on('mouseup', function(e) {
			$(this).unbind('mousemove');
		});

		$(this).on('mousemove', function(e) {
			e.preventDefault();
			var currentTile = getTile(e, oGrid);

			if (currentTile.x !== tile.x || currentTile.y !== tile.x) {
				var newTile = oGrid.tiles[currentTile.y][currentTile.x];
				var newPTile = pGrid.tiles[currentTile.y][currentTile.x];
				newTile.color = selectedColor;

				drawTile(newTile, 'draw');
				drawTile(newPTile, 'draw');
			}
			$(this).on('mouseout', function(e) {$(this).off('mousemove')});
			$(this).on('mouseup', function(e) {$(this).unbind('mousemove')});
		});
	});

	function updateDimensions(x, y, el) {
		console.log(x, y);
		el.html(x + ' x ' + y);
	}

	function updatePreview() {
		$.extend(pGrid.tiles, oGrid.tiles);
		for (var row in pGrid.tiles) {
			for (var col in pGrid.tiles[row]) {
				pGrid.tiles[row][col].scale = pGrid.scale;
			}
		}
		pGrid.draw('render');
	}

	function getTile(e, grid) {
		var gridX = Math.floor((e.offsetX - 1)/ TILE_SIZE);
		var gridY = Math.floor((e.offsetY - 1)/ TILE_SIZE);
		return grid.tiles[gridY][gridX];
	}

	function drawTile(t, action) {
		t.color = selectedColor;
		t.render(action, t.color);
	}

	function getPixelColor(x, y) {
		var rgba = pickerCTX.getImageData(x, y, 1, 1).data;
		return "rgba("+rgba[0]+","+rgba[1]+","+rgba[2]+","+rgba[3]+")";
	}

	function rgbaLighten(str, mult) {
		str = str.substring(5, str.length-1).split(',');
		str[str.indexOf('0')] = mult * SWATCH_LIGHTNESS_STEP;
		return "rgba(" + str.join(',') + ")";
	}

	function updateSwatches() {
		var klass = ".swatch-";
		for (var i = 0; i < NUM_SWATCHES; i++) {
			var $swatch = $(klass + i);
			var newColor = rgbaLighten(selectedColor, i);
			$swatch.css('background-color', newColor);
		}
	}

	bgGrid.init();
	bgGrid.draw();

	cGrid.init(['rgba(0, 0, 0, 0.5)']);
	cGrid.draw();

	oGrid.init();
	pGrid.init();
	window.oGrid = oGrid;
});