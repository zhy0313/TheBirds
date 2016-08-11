var SelectBirdGameLayer = cc.Layer.extend({

  container:   null,
  currentBird: '-1',

  convertBirdType: function (num) {

	if (num < 10) {
	  return '0' + num;
	}

	return num;

  },

  prevBirdIndex: function () {
	if (this.currentBird <= 1) {
	  return 10;
	} else {
	  return this.currentBird - 1;
	}

  },

  nextBirdIndex: function () {

	if (this.currentBird >= 10) {
	  return 1;
	} else {
	  return this.currentBird + 1;
	}

  }
  ,

  ctor: function (birdType) {
	this._super();


	this.currentBird = birdType;

	birdType = this.convertBirdType(birdType);

	container = new cc.Node();

	// Ствол
	tree = new cc.Sprite();
	tree.setTexture(res.Tree_png);
	tree.setAnchorPoint(cc.p(0.5, 0));
	tree.setPositionX(cc.winSize.width / 2);
	tree.setPositionY(0);
	tree.setScale(0.5);
	container.addChild(tree, 0);


	// Птица
	bird = new Bird(birdType, container);
	//bird.wingAction.target.stopAllActions();
	world.removeBody(bird._shape.body);


	// Ценник
	pricePopup = new cc.Sprite();
	pricePopup.setTexture(res.PricePopup_png);
	pricePopup.setAnchorPoint(cc.p(0.5, 0));
	pricePopup.setScale(0.5);
	pricePopup.setPositionX(cc.winSize.width / 2);
	pricePopup.setPositionY(bird._shape.body.p.y + 100);
	container.addChild(pricePopup, 2);


	priceLabel = new cc.LabelTTF(birdsInfo[parseInt(birdType)].price, 'Arial', 48);
	priceLabel.setAnchorPoint(cc.p(0.5, 0.5));
	priceLabel.setAnchorPoint(cc.p(0.5, 0.5));
	priceLabel.setPosition(cc.p(pricePopup.width / 2, pricePopup.height / 2));
	priceLabel.setColor(cc.color(255, 255, 255, 1));
	pricePopup.addChild(priceLabel);


	priceDiamont = new cc.Sprite();
	priceDiamont.setTexture(res.Diamond_png);
	priceDiamont.setAnchorPoint(cc.p(0.5, 0.5));
	priceDiamont.setScale(1);
	priceDiamont.setPositionX(100);
	priceDiamont.setPositionY(pricePopup.height / 2);
	pricePopup.addChild(priceDiamont);

	this.addChild(container);
  }


});