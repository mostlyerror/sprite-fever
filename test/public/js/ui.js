
$(document).on('click', '#link-editor', function(e) {
	changeView(e, '/editor');
});

$(document).on('click', '#button-add-moves', function(e) {
	changeView(e, '/moves');
});

function changeView(e, route) {
	console.log(this + ' clicked.');
	e.preventDefault();
	$("#content").load(route);	
}