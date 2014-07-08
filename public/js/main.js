$(function() {
	attachRoute('#link-editor', '/editor');
	attachRoute('#link-just-dance', '/dance');

	attachRoute('#button-add-moves', '/moves', function(e) {	
		$("#page-dim").css('opacity', 0.6).fadeIn(300);
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
			console.log(e.target);
			callback ? callback(e, route) : changeView(e, route);
		});
	}

	function changeView(e, route) {
		console.log('changeView called');
		e.preventDefault();
		// $("#content").load(route);
		$wrapper = $('<div>');
		$wrapper.addClass('loaded-content-wrapper').appendTo('#content').load(route, function() {
			// when completely loaded animate content left to reduceRight
			// also slide prev content to left and remove after
			console.log($(this).prev());
			$(this).animate({marginLeft: 0}, 'slow').prev().animate({marginLeft: '-100%'}, 'slow', function() {
				$(this).remove();
			})
		});
	}
});