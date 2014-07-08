

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

	var showing = false;
	var fadeTimer;
	var $callout = $('.callout');
	var $calloutText = $('.callout-text');
	var $helper  = $('.help-bob');

	var Grid = MyGrid.grid;
	var bgGrid = new Grid(bg, GRID_X, GRID_Y, 30);
	var oGrid  = new Grid(overlay, GRID_X, GRID_Y, 30);
	var pGrid  = new Grid(preview, GRID_X, GRID_Y, 13);
	var cGrid  = new Grid(palette, 9, 4, 30);

	bgGrid.init();
	bgGrid.draw();

	cGrid.init(['rgba(0, 0, 0, 0.5)']);
	cGrid.draw();

	oGrid.init();
	pGrid.init();
	window.oGrid = oGrid;
	// window.cGrid = cGrid;

	// instruction callouts
	$palette.on('mouseover', null, {str: 'Use the Palette to store colors you like.'}, callout);
	$picker.on('mouseover', null, {str:  'Click on the Color Picker to select a color.'}, callout);
	$overlay.on('mouseover', null, {str: 'Have at it, Pixel Picasso!'}, callout);
	$preview.on('mouseover', null, {str: 'Get a sneak Preview of your sprite.'}, callout);
	$helper.on('mouseover', null, {str: 'Hands to yourself!'}, callout);

	function callout(e) {
		// callbacks won't have event attached, so if event exists
		// this is the initial call
		// fadeTimer = e ? 4 : fadeTimer;
		if (e) {
			fadeTimer = 2;
			$calloutText.html(e.data.str);
			// bounce bob
			$helper.animate({top: '-3px'}, 'fast').animate({top: '0px'}, 'fast');
		}
		// fade callout in if it doesn't exist
		if (!showing) {
			$calloutText.fadeIn('slow');
			$callout.fadeIn('slow');
		}
		showing = true;
		// if currently counting down, decrement timer and recurse after 1 sec
		if (fadeTimer) {
			fadeTimer -= 1;
			setTimeout(callout, 1000);
		} else {
			$calloutText.fadeOut('fast');
			$callout.fadeOut('fast');
			showing = false;
		}
		console.log(callout, fadeTimer);
	}

	// function callout(el, str) {
	// 	el.on('mouseover', function(e) {
	// 		timer = 4;
	// 		callout = el;
	// 		if (!callout) {
	// 			$callout.fadeIn('slow');
	// 		}
	// 		$helper.animate({ top: '-3px' }, 150);
	// 		$helper.animate({ top: '0px' }, 150);
	// 		$callout.html(str);
	// 	});

	// 	if (!timer) {
	// 		$callout.fadeOut();
	// 		callout = null;
	// 	} else {
	// 		timer -= 1;
	// 		console.log(timer);
	// 		setTimeout(callout, 1000, el, str);
	// 	}
	// };

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
});