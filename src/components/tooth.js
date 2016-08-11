/**
 * Bird
 */
var Tooth = cc.Sprite.extend({

  ctor: function (x, y, w, h) {
	this._super();

	// удаляем tooth если они накладываются друг над другом
	if (collisionBodies.some(function (e) {
		  return e.body.p.y === y;
		})) {

	  return null;

	}

	var body = new cp.Body(Infinity, Infinity);

	body.setPos(cp.v(x, y));
	//var bodySprite = new cc.Sprite(res.Bird01_png);
	//layer.addChild(bodySprite, 0);
	//bodySprite.setPosition(240, 300);
	//bodySprite.setScale(0.5);

	//world.addBody(body);


	var shape = new cp.BoxShape(body, 56, 24);

	// проверяем позицию - если слева - значит другой угол, если справа - другой
	if(x < 200) {
	  shape.body.setAngle(-50);//TODO исправить на другое
	} else {
	  shape.body.setAngle(50);//TODO исправить на другое
	}


	shape.setFriction(1);
	shape.setElasticity(0);

	//shape.image = bodySprite;

	shape.name = "tooth";
	world.addShape(shape);
	this._shape = shape;


	// проверка чтобы не добавлялись одинаковые
	// TODO optimized; По-идее должна быть булевская переменная,
	// TODO Когда восстанавливаем из массива просто не нужно делать
	if (!collisionsPos.some(function (e) {
		  return e.x === shape.body.getPos().x && e.y === shape.body.getPos().y
		})) {
	  collisionsPos.push(shape.body.getPos());
	}

	console.log('tooth push')


	collisionBodies.push(shape);


  },

  destroy: function () {
  }

});