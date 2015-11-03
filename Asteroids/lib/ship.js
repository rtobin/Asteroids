(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";
    color = ""
    for (var i = 0; i < 3; i++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return "#" + color
  }

  var Ship = Asteroids.Ship = function (opts) {
    this.radius = Ship.RADIUS;
    this.vel = opts.vel || [0, 0];
    this.color = opts.color || randomColor();

    // Asteroids.MovingObject.call(this, opts);
    // this.img = img
  }

  Ship.RADIUS = 15;

  // Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.thrust = function (dv) {
    this.vel[0] += dv[0];
    this.vel[1] += dv[1];
  }

})();
