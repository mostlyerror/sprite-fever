// Constants(for now)
const TILE_SIZE = 30;
const GRID_X = 16;
const GRID_Y = 20;
const NUM_SWATCHES = 9;
const SWATCH_LIGHTNESS_STEP = Math.ceil(255 / NUM_SWATCHES); //29 for 9 swatches;
const LIGHT_GREY  = 'rgba(200, 200, 200, 1)';
const WHITE = 'rgba(255, 255, 255, 1)';
const GRID_BG_COLORS = [LIGHT_GREY, WHITE];

// Editor Canvases
var overlay = document.getElementById("overlay");
var preview = document.getElementById("preview");
var bg      = document.getElementById("bg");
var bgCTX   = bg.getContext("2d");
var oCTX    = overlay.getContext("2d");
var pCTX    = oCTX.translate(overlay.width, overlay.height); //wtf does this even do
bg.width    = overlay.width  = TILE_SIZE * GRID_X;
bg.height   = overlay.height = TILE_SIZE * GRID_Y;

// Color Picker & Swatches
var picker    = document.getElementById("color-picker-canvas");
var pickerCTX = picker.getContext("2d");
var swatches  = document.querySelectorAll('.swatch');
var swatchParent = document.querySelector('.swatch').parentNode;

// resize picker & swatches
picker.width  = $(picker.parentNode).width();
picker.height = 255;
$('.swatch').width($(swatchParent).width() / swatches.length);
var colorMap = new Image();
colorMap.onload = function() {
	pickerCTX.drawImage(colorMap, 0, 0, picker.width, picker.height);
};
colorMap.crossOrigin = "anonymous"; // CORS bullshit
colorMap.src = "http://localhost:8000/map-saturation.png"; // CORS bullshit
var colorPickerData = pickerCTX.getImageData(0, 0, picker.width, picker.height);

// Color Variables
var selectedColor = 'rgba(0,0,0,1)';
var colorCounter = 0;

$(function(){

	var Grid = MyGrid.grid;
	var bgGrid = new Grid(bg, GRID_X, GRID_Y);
	var oGrid  = new Grid(overlay, GRID_X, GRID_Y);

	window.oGrid = oGrid; //debug
	window.drawTile = drawTile; //debug

	bgGrid.initialize(true);
	oGrid.initialize();
	bgGrid.draw();

	var $bg      = $(bg);
	var $overlay = $(overlay);
	var $picker  = $(picker);

	$('#button-clear').on('click', function(e) { oGrid.clear() });			
	$('#button-save').on('click', function(e) { oGrid.save() });

	$picker.on('click', function(e) {
		selectedColor = getPixelColor(e.offsetX, e.offsetY);
		updateSwatches();
	});

	$overlay.on('contextmenu', function(e) {
		e.preventDefault();
		drawTile(getTile(e, oGrid), 'erase');
	});

	$overlay.on('mousedown', function(e) {
		e.preventDefault();

		var tile = getTile(e, oGrid);
		drawTile(tile, 'draw');

		$(this).on('mouseup', function(e) {$(this).unbind('mousemove'); });

		$(this).on('mousemove', function(e) {
			e.preventDefault();

			var currentTile = getTile(e, oGrid);

			if (currentTile.x !== tile.x || currentTile.y !== tile.x) {
				var new_tile = oGrid.tiles[currentTile.y][currentTile.x];
				new_tile.color = selectedColor;
				new_tile.render('draw');
			}

			$(this).on('mouseout', function(e) {$(this).off('mousemove')});
			$(this).on('mouseup', function(e) {$(this).unbind('mousemove')});

		});

		$('.swatch').on('click', function(e) {
			selectedColor = $(this).css('background-color');
		}); 
	});

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

