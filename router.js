// //router.js

// var appRouter = Backbone.Router.extend({

// 	initialize: function(el) {
// 		this.el = el;
// 		this.$el = $(el);
// 		this.homeView = new HomeView({});
// 		this.editPixelView = new editPixelView({});
// 		this.editMovesView = new editMovesView({});
// 		this.danceView = new danceView({});
// 	},

// 	routes: {
// 		"": "index",
// 		"home": "index",
// 		"edit": "editPixels",
// 		"moves": "editMoves",
// 		"dance": "dance"
// 	},

// 	currentView: null,

// 	switchView: function(view) {
// 		// if (this.currentView) {
// 		// 	this.currentView.remove();
// 		// }
// 		this.currentView = view;
// 		this.$el.html(this.currentView.render().el);
// 	},

// 	index: function() {
// 		this.switchView(this.homeView);
// 	},

// 	editPixels: function() {
// 		this.switchView(this.editPixelView);
// 	},

// 	editMoves: function() {
// 		this.switchView(this.editMovxesView);
// 	},

// 	dance: function() {
// 		this.switchView(this.danceView);
// 	},

// })

// var router = new appRouter($("#main-container"));
// Backbone.history.start();