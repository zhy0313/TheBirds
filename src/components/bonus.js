var Bonus = cc.Sprite.extend({

  ctor: function () {
	this._super();

	this.setTexture(res.Diamond_png);
	this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
	this.scheduleUpdate();
	this.setScale(0.5);

	Bonus.nextY += 1000;

  },

  setRandomPosX: function () {

	// FIXME
	// берем случайный от 200 до width-200
	var randomX = 200 + (Math.random() * (cc.winSize.width - 400));

	console.log(randomX)

	this.setPositionX(randomX);
  },

  update: function (dt) {

	if (this.checkCollision()) {
	  this.destroy();
	}

  },

  checkCollision: function () {

	var bodyRect = cc.rect(bird._shape.image.getBoundingBox());
	var bonusRect = cc.rect(this.getBoundingBox());

	return cc.rectOverlapsRect(bodyRect, bonusRect);

  },

  destroy: function () {
	console.log('destroy')


	this.runAction(
		cc.sequence(
			cc.scaleBy(0.5, 1.5),
			cc.callFunc(function (e) {
			  e.parent.removeChild(e);
			})
		)
	);

  }

});

Bonus.nextY = 0;