$(function() {
	attachRoute('#link-editor', '/editor');
	attachRoute('#link-just-dance', '/dance');
	// attachRoute('#button-add-moves', '/moves');

	$(document).on('click', '#button-add-moves', function(e) {
		var pixelData = oGrid.el.toDataURL();
		$.ajax({
			type: 'post',
			url: '/sprites/new', 
			data: { imgData : pixelData }
		}).done(function(err, msg, data) {
			console.log(err, msg, data);
			changeView(e, '/moves');
		});
	});

	// $(document).on('click', '#button-save', function(e) {
	// 	var newSpriteRef = spriteRef.push({
	// 		name: name,
	// 		dataURL: 
	// 	})
	// });

	function attachRoute(selector, route, data) {
		$(document).on('click', selector, function(e) {
			changeView(e, route);
		});
	}

	function changeView(e, route) {
		e.preventDefault();
		$("#content").load(route);	
	}
	
});