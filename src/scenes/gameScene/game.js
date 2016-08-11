var GameWorldScene = cc.Scene.extend({

  birdType: null,
  ctor:     function (birdType) {

	this._super();

	this.birdType = birdType;
  },

  onEnter: function () {
	this._super();



	backgroundLayer = new BackgroundLayer();

	layer = new HelloWorldLayer();

	uiLayer = new UILayer();

	pauseLayer = new PauseLayer();
	pauseLayer.setVisible(false)


	bird = new Bird(this.birdType, layer);
	bird.createPopup();



	world.setDefaultCollisionHandler(function collisionBegin(arbiter, space) {
	  //console.log('coll ' + arbiter.b.name)

	  if (arbiter.a.name === 'bird') {

		if (arbiter.b.name === 'wallLeft') {
		  bird.direction = 'r';
		} else if (arbiter.b.name === 'wallRight') {
		  bird.direction = 'l';
		}

		if (arbiter.b.name === 'tooth') {
		  //

		  pauseLayer.gameOver();

		  //if(confirm('game over?')) {
		  //location.reload(true);
		  //}

		}

		return true;
	  }

	  return false;

	}, null, null, null);


	var touchListener = cc.EventListener.create({
	  event:          cc.EventListener.TOUCH_ONE_BY_ONE,
	  swallowTouches: true,
	  onTouchBegan:   Bird.onTouchBegan()
	});
	cc.eventManager.addListener(touchListener, this);







	this.addChild(backgroundLayer);
	this.addChild(layer);
	this.addChild(uiLayer);
	this.addChild(pauseLayer);
  }
});

