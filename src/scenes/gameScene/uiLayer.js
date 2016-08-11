var UILayer = cc.Layer.extend({

  ctor: function () {
	this._super();

	// pause btn
	var pauseBtn = new ccui.Button();
	pauseBtn.loadTextures(res.PauseBtn_png, res.PauseBtn_png);
	pauseBtn.setPositionX(cc.winSize.width / 2);
	pauseBtn.setPositionY(50)
	pauseBtn.setScale(0.5);
	pauseBtn.setAnchorPoint(cc.p(0.5, 0.5));


	pauseBtn.addTouchEventListener(this.pauseBtnHandler, this);
	this.addChild(pauseBtn);

  },

  pauseBtnHandler: function (selector, type) {

	console.log('xxx')

	switch (type) {
	  case ccui.Widget.TOUCH_ENDED:


		  if(!cc.director.isPaused()) {


			pauseLayer.show();


		  } else {

			pauseLayer.hide();


		  }






		cc.director.isPaused()
			? cc.director.resume()
			: cc.director.pause();




		break;
	}

	return false;
  },



  update: function (dt) {

  }

});