var SelectBirdUILayer = cc.Layer.extend({

  ctor: function () {
	this._super();

	/// Select Bird Buttons
	//////////////////////////////////////////////////////////////

	// Left Button
	var leftBtn = new ccui.Button(res.ButtonLeft_png);
	leftBtn.setScale(0.5);
	leftBtn.setPosition(cc.p(60, 240));
	this.addChild(leftBtn);

	var rightBtn = new ccui.Button(res.ButtonRight_png);
	rightBtn.setScale(0.5);
	rightBtn.setPosition(cc.p(cc.winSize.width - 60, 240));
	this.addChild(rightBtn);

	/// Start Game Button
	//////////////////////////////////////////////////////////////

	// Use Button
	var useBtn = new ccui.Button(res.ButtonUse_png);
	useBtn.setScale(0.5);
	useBtn.setPosition(cc.p(cc.winSize.width / 2, 60));
	this.addChild(useBtn);

	var useBtnLabel = new cc.LabelTTF('USE', 'Arial', 34);
	useBtnLabel.setPosition(cc.p(cc.winSize.width / 2, 60));
	useBtnLabel.setColor(cc.color(0, 0, 0, 255));
	this.addChild(useBtnLabel);


	/// Points
	//////////////////////////////////////////////////////////////
	var diamont = new cc.Sprite();
	diamont.setTexture(res.HudDiamont_png);
	diamont.setAnchorPoint(cc.p(0.5, 0.5));
	diamont.setPositionX(40);
	diamont.setPositionY(cc.winSize.height - 40);
	diamont.setScale(0.5);
	this.addChild(diamont);

	var pointsLabel = new cc.LabelTTF('1000', 'Arial', 34);
	pointsLabel.setAnchorPoint(cc.p(0, 0.5));
	pointsLabel.setPosition(cc.p(80, cc.winSize.height - 40));
	pointsLabel.setColor(cc.color(255, 255, 255, 1));
	this.addChild(pointsLabel);


	/// Lifes
	//////////////////////////////////////////////////////////////
	var heart = new cc.Sprite();
	heart.setTexture(res.HudHeart_png);
	heart.setAnchorPoint(cc.p(0.5, 0.5));
	heart.setPositionX(cc.winSize.width - 40);
	heart.setPositionY(cc.winSize.height - 40);
	heart.setScale(0.5);
	this.addChild(heart);

	var lifesLabel = new cc.LabelTTF('5x', 'Arial', 34);
	lifesLabel.setAnchorPoint(cc.p(1, 0.5));
	lifesLabel.setPosition(cc.p(cc.winSize.width - 80, cc.winSize.height - 40));
	lifesLabel.setColor(cc.color(255, 255, 255, 1));
	this.addChild(lifesLabel);



	leftBtn.addTouchEventListener(this.leftBtnHandler, this);
	rightBtn.addTouchEventListener(this.rightBtnHandler, this);
	useBtn.addTouchEventListener(this.useBtnHandler, this);

  },

  leftBtnHandler: function (selector, type) {

	switch (type) {
	  case ccui.Widget.TOUCH_ENDED:

		// создаем новую сцену
		var scene = cc.director.getRunningScene();
		var firstGameLayer = scene.gameLayers[0];
		var nextBird = firstGameLayer.nextBirdIndex();


		// Проверка на допустимость
		if (scene.gameLayers.length !== 1) {
		  cc.error('game layers more');
		  return;
		}


		var gameLayer = new SelectBirdGameLayer(nextBird);
		gameLayer.x = -cc.winSize.width;
		scene.addGameLayer(gameLayer);
		gameLayer.runAction(cc.moveTo(1, cc.p(0, 0)));


		// удаляем существующую сцену
		firstGameLayer.runAction(
			cc.sequence(
				cc.moveBy(1, cc.p(cc.winSize.width, 0)),
				cc.callFunc(function (e) {
				  scene.removeChild(e);
				  scene.gameLayers.shift();
				})
			)
		);


		break;
	}

  },

  rightBtnHandler: function (selector, type) {

	switch (type) {
	  case ccui.Widget.TOUCH_ENDED:

		// создаем новую сцену
		var scene = cc.director.getRunningScene();
		var firstGameLayer = scene.gameLayers[0];
		var nextBird = firstGameLayer.prevBirdIndex();


		// Проверка на допустимость
		if (scene.gameLayers.length !== 1) {
		  cc.error('game layers more');
		  return;
		}

		var gameLayer = new SelectBirdGameLayer(nextBird);
		gameLayer.x = cc.winSize.width;
		scene.addGameLayer(gameLayer);
		gameLayer.runAction(cc.moveTo(1, cc.p(0, 0)));


		// удаляем существующую сцену
		firstGameLayer.runAction(
			cc.sequence(
				cc.moveBy(1, cc.p(-cc.winSize.width, 0)),
				cc.callFunc(function (e) {
				  scene.removeChild(e);
				  scene.gameLayers.shift();
				})
			)
		);

		break;
	}
  },

  useBtnHandler: function (selector, type) {

	switch (type) {
	  case ccui.Widget.TOUCH_ENDED:

		var scene = cc.director.getRunningScene();
		var firstGameLayer = scene.gameLayers[0];

		var birdType = firstGameLayer.convertBirdType(firstGameLayer.currentBird);

		// удаляем физические bodies со сцены
		world.bodies.forEach(function (b) {
		  b.shapeList.forEach(function (shape) {
			world.removeShape(shape);
		  });

		  world.removeBody(b);
		});

		cc.director.runScene(new GameWorldScene(birdType));

		break;
	}

  }

});