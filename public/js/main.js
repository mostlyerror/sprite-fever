$(function() {

	attachRoute('#link-editor', 'click', '/editor');
	attachRoute('#link-just-dance', 'click', '/dance');

	attachRoute('#button-to-moves', 'click', '/moves', function(e) {	
		$("#page-dim").css('opacity', 0.75).fadeIn(300);
		$("#loading").css('opacity', 1).fadeIn(200);
		var pixelData = oGrid.el.toDataURL();
		$.ajax({
			type: 'post',
			url: '/sprites', 
			data: { imgData : pixelData }
		}).done(function(response, data) {
			changeView(e, '/moves');
			window.currentSpriteId = response;
		});
	});

	// attachRoute('#sprite-name-input-form', 'submit', '/sprite/' + currentSpriteId + '/moves', function(e) {	
	// 	e.preventDefault();
	// 	$("#page-dim").css('opacity', 0.75).fadeIn(300);
	// 	$("#loading").css('opacity', 1).fadeIn(200);
	// 	console.log('/sprites/' + currentSpriteId + '/moves')
	// 	debugger;
	// 	$.ajax({
	// 		type: 'post',
	// 		url: '/sprites/' + currentSpriteId + '/moves', 
	// 		data: { moves : movesData, name: window.name }
	// 	}).done(function(response, data) {
	// 		changeView(e, '/dance');
	// 	});
	// });

	function attachRoute(selector, event, route, callback) {
		$(document).on(event, selector, function(e) {
			callback ? callback(e, route) : changeView(e, route);
		});
	}

	function changeView(e, route) {
		console.log('changeView(' + route + ')');
		e.preventDefault();
		$wrapper = $('<div>');
		$wrapper.addClass('loaded-content-wrapper').appendTo('#content').load(route, function() {
			console.log($(this).prev());
			$(this).animate({marginLeft: 0}, 'slow').prev().animate({marginLeft: '-100%'}, 'slow', function() {
				$(this).remove();
			})
		});
	}
});