(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }


  var Game = Asteroids.Game = function (asteroidImg) {
    this.bullets = [];
    this.ship = new Asteroids.Ship({ game: Game });
    this.asteroids = this.addAsteroids(asteroidImg);

  }

  Game.BACKGROUND = "#000000"
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.DT = 1 / Game.FPS
  Game.BUFFER_X = Game.DIM_X * 0.1;
  Game.BUFFER_Y = Game.DIM_Y * 0.1;
  Game.NUM_ASTEROIDS = 10;
  Game.ORIGIN = [Math.floor(Game.DIM_X - Game.BUFFER_X),
                 Math.floor(Game.DIM_Y - Game.BUFFER_Y)]
  // Note: the origin never changes, in fact the ship stays center
  // the origin is the perspective of the ship, so every objects velocity
  // changes relative to the ships velocity

  Game.prototype.addAsteroids = function(img) {
    var asteroids = [];
    var that = this;

    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      asteroids.push(new Asteroids.Asteroid(that.randomPosition(), img, that));
    };

    return asteroids;
  };

  Game.prototype.randomPosition = function () {
    return [
      (Math.random() * Game.DIM_X),
      (Math.random() * Game.DIM_Y)
    ];
  };

  Game.prototype.loadShip = function () {
    var ship = new Asteroids.Ship({ game: Game });

    return ship;
  };

  Game.prototype.destroy

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    // this.CheckCollisions()

    this.asteroids.forEach(function (asty) {
      if (typeof(asty) !== "number") {
        asty.pos = this.wrap(asty.pos);
        asty.draw(ctx);
      }
    }.bind(this));
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asty) {
      if (typeof(asty) !== "number"){
        asty.move();
      }
    })
  }

  Game.prototype.wrap = function (pos) {
    return [(pos[0] + this.DIM_X) % (this.DIM_X),
            (pos[1] + this.DIM_Y) % (this.DIM_Y)]
  }

  Game.prototype.distanceBetween = function (pos1, pos2) {
    return Math.sqrt(
              Math.pow((pos1[0] - pos2[0]), 2) +
              Math.pow((pos1[1] - pos2[1]), 2)
            )
  }

  Game.prototype.CheckCollisions = function () {
    var asties = this.asteroids;
    for( var i = 0; i < this.asteroids.length; i++){
      for( var j = 0; j < this.asteroids.length; j++){
        var asty1 = asties[i];
        var asty2 = asties[j];
        if (i != j &&
          typeof asty1 !== "number" &&
          typeof asty2 !== "number") {
            if ((asty1.radius + asty2.radius) >=
                this.distanceBetween(asty1.pos, asty2.pos)) {
                  asties[i] = -1;
                  asties[j] = -1;
            }

        }else{

        }
      }
    }
  }
})();
