
var app = {
	views: {},
	templates: {},
	currentView: null
};

var Router = Backbone.Router.extend({
	routes: {
		"edit": "pixelEdit",
		"moves": "movesEdit",
		"dance": "dance",
		"": "index"
	}, 
	index: function() {
		console.log('index');
	},
	pixelEdit: function() {
		console.log('pixelEdit');
	},
	movesEdit: function() {
		console.log('movesEdit');
	},
	dance: function() {
		console.log('dance');
	}
});

app.router = new Router();
Backbone.history.start();

window.app = app;

