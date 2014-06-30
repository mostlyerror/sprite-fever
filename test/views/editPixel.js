// views/master.js

var editPixelTpl ='\
<div class="container">\
    <div class="row">\
      <div class="left large-3">\
        <div class="row">\
          <div><span>Colors</span></div>\
          <div id="color-picker">\
            <canvas id="color-picker-canvas"></canvas>\
            <div id="swatch-container">\
              <div class="swatch swatch-0"></div>\
              <div class="swatch swatch-1"></div>\
              <div class="swatch swatch-2"></div>\
              <div class="swatch swatch-3"></div>\
              <div class="swatch swatch-4"></div>\
              <div class="swatch swatch-5"></div>\
              <div class="swatch swatch-6"></div>\
              <div class="swatch swatch-7"></div>\
              <div class="swatch swatch-8"></div>\
            </div>\
          </div>\
        </div>\
        <!-- <div class="row"> -->\
          <div id="toolbar">\
            <button id="button-clear" class="button clear">clear</button>\
          </div>\
        <!-- </div> -->\
      </div>\
      <div class="columns large-5 medium-5 small-5">\
\
        <div class="grid-container">\
          <canvas id="overlay"></canvas>\
          <canvas id="bg"></canvas>\
        </div>\
      </div>\
      <div id="right"class="columns large-3 medium-3 small-3 right">\
        <div class="row">\
          <div class="control"><span>Preview</span></div>\
        </div>\
\
        <div class="row">\
          <div class="preview-container">\
            <canvas id="preview"></canvas>\
          </div>\
        </div>\
\
        <div class="row">\
          <div class="name-container">\
          <input id="name-input" type="text" placeholder="Name me...">\
          <button id="button-save" class="button save">Save</button>\
          </div>\
        </div>\
\
        </div>\
      </div>\
    </div>\
  </div>';

editPixelView = Backbone.View.extend({
	tagName: 'div',

	initialize: function() {
		this.render(editPixelTpl);
	},
  
	render: function(tpl) {
		this.$el.html(tpl);
    return this;
	}
});

