var SelectBirdScene = cc.Scene.extend({

  gameLayers: [],

  onEnter: function () {
	this._super();

	var backgroundLayer = new SelectBirdBackgroundLayer();
	var gameLayer = new SelectBirdGameLayer(1);
	var uiLayer = new SelectBirdUILayer();

	this.addChild(backgroundLayer, 0);
	this.addGameLayer(gameLayer, 1);
	this.addChild(uiLayer, 2);

  },

  addGameLayer: function (layer) {

	this.gameLayers.push(layer);
	this.addChild(layer, 1);

  }

});