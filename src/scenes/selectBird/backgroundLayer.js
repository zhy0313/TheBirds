var SelectBirdBackgroundLayer = cc.Layer.extend({

  ctor: function () {
	this._super();

	/// Blue gradient
	//////////////////////////////////////////////////////
	var gradientLayer = new cc.LayerGradient(
		cc.color(41, 20, 78, 255),
		cc.color(69, 204, 191, 255)
	);
	this.addChild(gradientLayer, 0);

	this.createDynamicCloud();
  },

  createDynamicCloud:

	   function () {

	var self = this;

	// Cloud
	//////////////////////////////////////////////////////
	var cloud = new cc.Sprite();
	cloud.setTexture(res.Cloud_png);
	cloud.setPositionX(cc.winSize.width + 200);
	cloud.setPositionY(cc.winSize.height - cc.rand() % cc.winSize.height / 2);
	cloud.setScale(cc.random0To1());
	cloud.setAnchorPoint(cc.p(1, 0.5));
	cloud.setFlippedX(Number(cc.random0To1() > 0.5));
	this.addChild(cloud, 0);

	cloud.runAction(
		cc.sequence(
			cc.moveTo(20, cc.p(-cloud.width, cloud.getPositionY())),
			cc.callFunc(function (e) {
			  e.parent.removeChild(e);

			  self.createDynamicCloud();
			})
		)
	);

  }


});