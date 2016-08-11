var Edge = cc.Sprite.extend({
  _shape: null,

  ctor:   function (x, y, w, h, name) {
	this._super();

	this.addBody(x, y, w, h, name);
  },

  setPositionY: function (y) {

	this._shape.body.p.y = y;

  },

  addBody: function (x, y, w, h, name) {

	var body = new cp.Body(Infinity, Infinity);
	body.setPos(cp.v(x, y));
	//var bodySprite = cc.Sprite.create(spriteImage);
	//gameLayer.addChild(bodySprite,0);
	//bodySprite.setPosition(posX,posY);

	var shape = new cp.BoxShape(body, w, h);
	shape.setFriction(1);
	shape.setElasticity(0);

	//shape.image=bodySprite;
	shape.name = name;
	//world.addShape(shape);

	world.addStaticShape(shape);


	this._shape = shape;
  }
});