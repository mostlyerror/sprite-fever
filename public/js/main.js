$(function() {
	attachRoute('#link-editor', '/editor');
	attachRoute('#link-just-dance', '/dance');

	attachRoute('#button-add-moves', '/moves', function(e) {	
		$("#page-dim").css('opacity', 0.75).fadeIn(300);
		$("#loading").css('opacity', 1).fadeIn(200);
		var pixelData = oGrid.el.toDataURL();
		$.ajax({
			type: 'post',
			url: '/sprites', 
			data: { imgData : pixelData }
		}).done(function(response, data) {
			changeView(e, '/moves');
		});
	});

	// attachRoute('#button-save', '/dance', function(e) {
		// $("#page-dim").css('opacity', 0.75).fadeIn(300);
		
	// 	var name = nameSprite(function() {
	// 		$("#saving").css('opacity', 1).fadeIn(200);
	// 		$.ajax({
	// 			type: 'post',
	// 			url: '/dance',
	// 			data: { 
	// 				name: name,
	// 				moves: captured
	// 			}
	// 		}).done(function(response, data) {
	// 			changeView(e, '/dance');
	// 		});	
	// 	});
	// }

	// $("#modal-name input").on('keypress', function(e) {
	// 	if (e.which == 13) {
	// 		name = $(this).val();
	// 		$(this).trigger('named');
	// 	}
	// });

	// $(document).on('named', function(e) {
	// 	// fade outremove modal
	// });

	// function nameSprite(callback) {
	// 	// slidedown modal div
	// 	$("#modal")
	// }

	// if callback provided, exec callback
	function attachRoute(selector, route, callback) {
		$(document).on('click', selector, function(e) {
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