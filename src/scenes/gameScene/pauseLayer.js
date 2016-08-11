var PauseLayer = cc.Layer.extend({

  show: function () {

	this.setVisible(true);

  },

  hide: function () {

	this.setVisible(false);

  },


  gameOver: function () {

	this.setVisible(true);


	// Game Over Label
	var gameOverLabel = new cc.LabelTTF('GAME OVER', 'Arial', 28);
	gameOverLabel.setColor(cc.color(0, 0, 0, 255));
	gameOverLabel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 150)
	this.addChild(gameOverLabel);


	// Score Label
	var scoreLabel = new cc.LabelTTF('score: '  + bird.birdMaxY + 'm', 'Arial', 18);
	scoreLabel.setColor(cc.color(0, 0, 0, 255));
	scoreLabel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
	this.addChild(scoreLabel);



	// Start Button
//var startBtn = new ccui.Button(res)



	cc.director.pause();
  },

  ctor: function () {
	this._super();

	//
	var popUpPause = new cc.Sprite();
	popUpPause.setTexture(res.PopUp_png);
	popUpPause.setPositionX(cc.winSize.width / 2);
	popUpPause.setPositionY(cc.winSize.height / 2);
	popUpPause.setScale(0.5);
	this.addChild(popUpPause);


  }

});

