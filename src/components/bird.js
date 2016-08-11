/**
 * Bird
 */
var Bird = cc.Class.extend({
  direction: 'l',

  camera: null,

  // используется для высчитывания вверх или вниз
  birdPosY:    0,
  birdMaxY:    0,
  birdScreenY: 0,

  timer: 15,

  ctor: function (birdType, layer) {

	var body = new cp.Body(1, cp.momentForBox(1, 48, 48));
	body.setPos(cp.v(240, 300));


	var bodySprite = new cc.Sprite(res['Bird' + birdType + '_png']);
	layer.addChild(bodySprite, 0);
	bodySprite.setPosition(240, 300);
	bodySprite.setScale(0.5);

	world.addBody(body);
	var shape = new cp.BoxShape(body, 48, 48);
	shape.setFriction(1);
	shape.setElasticity(0);

	shape.image = bodySprite;


	// Wing
	wingSprite = shape.wingSprite = new cc.Sprite(res['Bird' + birdType + 'Wing_png']);


	// TODO: проверить
	switch (parseInt(birdType)) {

	  case 1:
		wingSprite.setAnchorPoint(cc.p(0.6, 1));
		break;

	  case 2:
		wingSprite.setAnchorPoint(cc.p(0.8, 0.9));
		break;

	  case 3:
		wingSprite.setAnchorPoint(cc.p(1, 0.9));
		break;


	  case 4:
		wingSprite.setAnchorPoint(cc.p(1, 0.9));
		break;

	  case 5:
		wingSprite.setAnchorPoint(cc.p(1.1, 0.6));
		break;

	  case 6:
		wingSprite.setAnchorPoint(cc.p(0.8, 0.9));
		break;

	  case 7:
		wingSprite.setAnchorPoint(cc.p(0.8, 0.5));
		break;

	  case 8:
		wingSprite.setAnchorPoint(cc.p(0.9, 0.8));
		break;

	  case 9:
		wingSprite.setAnchorPoint(cc.p(0.8, 1.1));
		break;

	  case 10:
		wingSprite.setAnchorPoint(cc.p(0.8, 1));
		break;


	}

	console.log(birdType);

	//wingSprite.setAnchorPoint(cc.p(1, 1));



	wingSprite.setPosition(cc.p(bodySprite.width / 2, bodySprite.height / 2));
	bodySprite.addChild(wingSprite, 1);

	// Wing Animation
	/*	this.wingAction = wingSprite.runAction(
	 cc.repeatForever(
	 cc.sequence(
	 cc.rotateTo(0.25, 45),
	 cc.rotateTo(0.25, -45))
	 )
	 );*/



	shape.name = "bird";
	world.addShape(shape);
	this._shape = shape;



	this.createPopup();

  },

  step: function (dt) {

	// обновлем позицию bird (двигаем слева направа и обратно)
	if (bird.direction === 'l') {
	  bird._shape.body.setPos(cc.p(bird._shape.body.p.x - 2, bird._shape.body.p.y));

	  bird._shape.wingSprite.anchorX = 0;
	  bird._shape.wingSprite.setFlippedX(1);
	  bird._shape.image.setFlippedX(1);
	} else if (bird.direction === 'r') {
	  bird._shape.body.setPos(cc.p(bird._shape.body.p.x + 2, bird._shape.body.p.y))

	  bird._shape.wingSprite.anchorX = 1;
	  bird._shape.wingSprite.setFlippedX(0);
	  bird._shape.image.setFlippedX(0);
	}

	this.birdPosY = bird._shape.body.getPos().y;



	bird._shape.image.setPosition(bird._shape.body.p);



	if (--this.timer === 0) {
	  this.timer = 15;

	  this.createPopup();
	}



	layer.stopAction(this._followAction);

	this._followAction = cc.follow(
		bird._shape.image
		, cc.rect(
			0,
			0,
			cc.winSize.width,
			cc.winSize.height + this.birdPosY
		)
	);

	layer.runAction(this._followAction);

  },

  _followAction: null,

  destroy: function () {
  },


  createPopup: function () {
	var self = this;

	var popUp = new cc.Sprite(res.BirdPopup_png);

	popUp.setPosition(this._shape.body.p);
	popUp.visible = true;
	popUp.setAnchorPoint(cc.p(0.5, 0.5));

	popUp.setScale(0.1);

	this._shape.image.setLocalZOrder(1);
	this._shape.image.parent.addChild(popUp, 0);

	popUp.runAction(cc.scaleTo(1, 0));
	popUp.runAction(cc.sequence(
		cc.fadeOut(1),
		cc.callFunc(function () {
		  popUp.parent.removeChild(popUp);
		})
	));

  }



});

Bird.onTouchBegan = function () {
  var touchTimeout = 50,
	  touchEnabled = true,
	  t = null;

  return function (touch, event) {

	if (!touchEnabled)
	  return;

	bird._shape.body.setVel({x: 0, y: 0});
	bird._shape.body.applyImpulse(cp.v(0, 350), cp.v(0, 0));

	bird._shape.wingSprite.runAction(
		cc.sequence(
			cc.rotateTo(0.25, 45),
			cc.rotateTo(0.25, -45))
	);


	t = t || setTimeout(function () {
		  touchEnabled = true;
		  t = null;
		}, touchTimeout);

	touchEnabled = false;
  };

};
