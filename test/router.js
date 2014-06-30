var Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		"edit": "pixelEdit",
		"moves": "danceEdit",
		"dance": "dance"
	},
	index: function() {
		var mv = new app.views.master();
	},
	pixelEdit: function() {
		$(document.body).html('<p>pixelEdit route has been called</p>');
	},
	danceEdit: function() {
		$(document.body).html('<p>danceEdit route has been called</p>');
	},
	dance: function() {
		$(document.body).html('<p>dance route has been called</p>');
	}
});

app.router = new Router;
Backbone.history.start();