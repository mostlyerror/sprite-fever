var homeTpl = '\
	<div class="large-12 columns">\
		<div class="title-wrapper">\
			<img class="title" src="images/Sprite-Fever.png">\
		</div>\
	</div>\
	\
	<div class="row">\
		<div class="large-3 medium-3 small-3 columns"></div>\
		<div class="large-6 medium-6 small-6 columns large-centered medium-centered small-centered">\
			<a id="edit" href="#edit"><img src="images/New-Sprite.png" alt="editor"></a>\
			</br>\
			<a id="dance" href="#dance"><img src="images/just-dance.png" alt="dance"></a>\
			</br>\
			</div>\
		<div class="large-3 mediums-3 small-3 columns"></div>\
	</div>\
	\
	<audio src="../test/sound/load.m4a" type="audio/mp4" autoplay="true" loop="true">\
	<p>Your browser does not support HTML5 audio.</p>\
	</audio>';

HomeView = Backbone.View.extend({
	tagName: 'div',

	events: {
		'click #edit': 'log'
	},

	log: function() { 
		router.navigate('edit', {trigger: true});
	},

	initialize: function() {
		this.render(homeTpl);
	},

	render: function(tpl) {
		this.$el.html(tpl);
		return this;
	}
});