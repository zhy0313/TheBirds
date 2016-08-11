var BackgroundLayer = cc.Layer.extend({

  _wallLeft:  null,
  _wallRight: null,
  _ground:    null,

  ctor:   function () {
	this._super();

	// переиндексация каждые 1 секунды
	this.schedule(this.update, 1);

	// фиолетовый фон
	var gradientLayer = new cc.LayerGradient(
		cc.color(72, 32, 84, 255),
		cc.color(128, 58, 133, 255)
	);
	this.addChild(gradientLayer);

	// Облака
	var cloud1 = new cc.Sprite();
	cloud1.setTexture(res.Cloud_png);
	cloud1.setPositionX(cc.winSize.width / 2)
	cloud1.setPositionY(cc.winSize.height / 2)
	cloud1.setScale(0.5)
	this.addChild(cloud1);

	var cloud2 = new cc.Sprite();
	cloud2.setTexture(res.Cloud_png);
	cloud2.setPositionX(cc.winSize.width / 2 + 100)
	cloud2.setPositionY(cc.winSize.height / 2 - 300)
	cloud2.setScale(0.5)
	this.addChild(cloud2);



	// WALL LEFT
	this._wallLeft = new Edge(0, 0, 20, cc.winSize.height * 2, 'wallLeft');
	var drawNodeWallLeft = new cc.DrawNode();
	drawNodeWallLeft.drawRect(cc.p(0, 0), cc.p(20, cc.winSize.height), cc.color(0, 0, 0), 10, 10)
	this.addChild(drawNodeWallLeft);

	// WALL RIGHT
	this._wallRight = new Edge(cc.winSize.width, 0, 20, cc.winSize.height * 2, 'wallRight');
	//drawNodeWallRight = new cc.DrawNode();
	//drawNodeWallRight.drawRect(cc.p(1, 0), cc.p(20, cc.winSize.height), cc.color(0, 0, 0), 10, 10)
	//this.addChild(drawNodeWallRight);

	// Ground
	this._ground = new Edge(240, 0, 480, 20, 'ground');

  },
  update: function (dt) {

	this._wallLeft.setPositionY(bird._shape.body.getPos().y);
	this._wallRight.setPositionY(bird._shape.body.getPos().y);

	world.reindexStatic();
  }

});

