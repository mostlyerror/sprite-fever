// views/danceView.toJSON
// views/master.js

var danceViewTpl ='\
<div class="dancer-container">\
  <div class="dancer">\
    <img class="dancer" src="../test/images/mario.png" alt="">\
  </div>\
</div>\
\
<div class="moves-container">\
  <label>Dance Moves</label>\
\
  <form method="post">\
        <select name="Dance Moves">\
                <option value="bounce">Bounce</option>\
                <option value="shake">Shake</option>\
                <option value="wobble">Wobble</option>\
                <option value="swing">Swing</option>\
        </select>\
  </form>\
</div>\
<audio src="../test/sound/load.m4a" type="audio/mp4" autoplay="true" loop="true">\
</div>';

danceView = Backbone.View.extend({
	tagName: 'div',

	initialize: function() {
		this.render(danceViewTpl);
	},

	render: function(tpl) {
		this.$el.html(tpl);
    return this;
	}
});

