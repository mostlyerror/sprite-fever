$(function() {
	attachRoute('#link-editor', '/editor');
	attachRoute('#link-just-dance', '/dance');

	attachRoute('#button-add-moves', '/moves', function(e) {
		var pixelData = oGrid.el.toDataURL();
		$.ajax({
			type: 'post',
			url: '/sprites', 
			data: { imgData : pixelData }
		}).done(function(response, data) {
			changeView(e, '/moves');
		});
	});

	// if callback provided, exec callback
	function attachRoute(selector, route, callback) {
		$(document).on('click', selector, function(e) {
			callback ? callback(e, route) : changeView(e, route);
		});
	}

	function changeView(e, route) {
		e.preventDefault();
		$("#content").load(route);	
	}
	
});