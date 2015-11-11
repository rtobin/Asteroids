(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";
    color = "";
    for (var i = 0; i < 3; i++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return "#" + color;
  }

  var Ship = Asteroids.Ship = function (opts) {
    this.radius = Ship.RADIUS;
    this.vx = opts.vx || 0;
    this.vy = opts.vy || 0;
    this.angle = Asteroids.Util.getTheta(this.vx, this.vy);
    this.pos = opts.pos || [];
    this.color = opts.color || randomColor();

    // Asteroids.MovingObject.call(this, opts);
    // this.img = img
  };

  Ship.prototype.speed = function () {
    return Asteroids.Util.vecNorm(this.vx, this.vy);
  };

  Ship.RADIUS = 15;

  // Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.thrust = function (dvx, dvy) {
    this.vx += dvx;
    this.vy += dvy;
    this.angle = Asteroids.Util.getTheta(this.vx, this.vy);
  };

})();
