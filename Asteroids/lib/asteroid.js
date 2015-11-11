(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }
  var Asteroid = Asteroids.Asteroid = function (opts) {
    // need to have opts.game already in opts
    //pos, img, game
    // var opts = {}
    opts.color = Asteroid.COLOR;
    opts.pos = opts.pos || [0,0];
    opts.radius = opts.radius || 50 * Math.random(); //Asteroid.RADIUS;
    var vel = Asteroids.Util.randomVec(Asteroid.SPEED);
    opts.vx = vel[0];
    opts.vy = vel[1];
    //opts.img = img;
    Asteroids.MovingObject.call(this, opts);
  };

  Asteroid.COLOR = "#f00";
  // Asteroid.RADIUS = 50 * Math.random();
  Asteroid.SPEED = 2; // default speed gets multiplied by a random vec
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (entity) {
    if (entity instanceof Asteroids.Ship) { entity.relocate}
  };



})();
