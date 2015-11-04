(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }
  var Asteroid = Asteroids.Asteroid = function (pos, img, game) {
    var opts = {}
    opts.color = Asteroid.COLOR;
    opts.pos = pos;
    opts.radius = 50 * Math.random(); //Asteroid.RADIUS;
    opts.vel = Asteroids.Util.randomVec(Asteroid.SPEED);
    opts.game = game;
    opts.img = img;
    Asteroids.MovingObject.call(this, opts);
  };

  Asteroid.COLOR = "#f00";
  // Asteroid.RADIUS = 50 * Math.random();
  Asteroid.SPEED = 10; // default speed gets multiplied by a random vec
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (entity) {
    if (entity instanceof Asteroids.Ship) { entity.relocate}
  }



})();
