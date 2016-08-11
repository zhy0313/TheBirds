// сохраняем здесь только позиции
var collisionsPos = [];

// сохраняем здесь сами bodies
var collisionBodies = [];


var birdsInfo = [
  {
	name:  '',
	price: '100'
  }, {
	name:  '',
	price: '200'
  }, {
	name:  '',
	price: '300'
  }, {
	name:  '',
	price: '400'
  }, {
	name:  '',
	price: '500'
  }, {
	name:  '',
	price: '600'
  }, {
	name:  '',
	price: '700'
  }, {
	name:  '',
	price: '800'
  }, {
	name:  '',
	price: '900'
  }, {
	name:  '',
	price: '2000'
  }, {
	name:  '',
	price: '2000'
  }
];



// TODO: это должно быть в другом метсе
var HelloWorldLayer = cc.Layer.extend({
  ctor:   function () {
	this._super();

	var size = cc.winSize;

	this.scheduleUpdate();

	var debugDraw = new cc.PhysicsDebugNode(world);
	debugDraw.setVisible(true);
	this.addChild(debugDraw);

	return true;
  },
  update: function (dt) {

	bird.step(dt);



	// Добавляем новые бонусы
	// каждые 100 метров
	if (bird.birdPosY > Bonus.nextY) {
	  bonus = new Bonus();
	  bonus.setRandomPosX();
	  bonus.setPositionY(bird.birdPosY + 200);

	  layer.addChild(bonus);
	}


	// генерируем новые препятствия и удаляем старые
	//////////////////////////////////////////////////////////
	if (bird.birdPosY > bird.birdScreenY) { // BOTTOM
	  bird.birdScreenY = bird.birdPosY + 300;

	  // максимальная высота на которую забиралась птичка
	  if (bird.birdPosY > bird.birdMaxY) {
		bird.birdMaxY = bird.birdPosY;


		// TODO сразу вставляем несколько рандомно. Слева и справа
		while (Math.floor(Math.random() * 2)) {
		  new Tooth(20, bird.birdScreenY + (cc.rand() % 600));
		  new Tooth(cc.winSize.width - 20, bird.birdScreenY + (cc.rand() % 600));
		}

	  }

	  // Восстанавливаем из массива
	  collisionsPos.filter(function (e) {
		return (e.y > bird.birdPosY) && (e.y < bird.birdPosY + 500)
	  }).forEach(function (e) {

		if (collisionBodies.some(function (e) {
			  return e.body.p === e
			})) {

		} else {
		  new Tooth(e.x, e.y, 24, 24);
		}

	  });



	  // удаляем нижние collisionBodis
	  for (var i = 0; i < collisionBodies.length; ++i) {

		// очищаем нижние collisionBody
		if (collisionBodies[i].body.getPos().y < bird.birdPosY - 300) {
		  world.removeShape(collisionBodies[i]);
		  collisionBodies.splice(i, 1);
		}

	  }



	} else if (bird.birdPosY < bird.birdScreenY - 300) {
	  bird.birdScreenY = bird.birdPosY;

	  //console.log('remove')


	  // восстанавливаем из массива
	  collisionsPos.filter(function (e) {
		return (e.y < bird.birdPosY) && (e.y > bird.birdPosY - 300)
	  }).forEach(function (e) {

		// удаляем из мира, если таковой tooth уже есть
		//world.removeShape(collisionBodies[i]);

		if (collisionBodies.some(function (e) {
			  return e.body.p === e
			})) {

		} else {
		  new Tooth(e.x, e.y, 24, 24);
		}

	  });



	  // удаляем верхние collisionBodis
	  for (var i = 0; i < collisionBodies.length; ++i) {

		// очищаем нижние collisionBody
		if (collisionBodies[i].body.getPos().y > bird.birdPosY + 300) {
		  world.removeShape(collisionBodies[i]);
		  collisionBodies.splice(i, 1);
		}
	  }


	}



	world.step(dt);
  }

});
