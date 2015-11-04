(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }


  var MovingObject = Asteroids.MovingObject = function (opts) {
    this.pos = opts.pos; // relative to center
    this.vel = opts.vel;
    this.radius = opts.radius;
    this.color = opts.color;
    this.game = opts.game;
    this.frameVelocity = this.game.ship.vel
    this.img = opts.img
    this.frameOrigin = this.game.ORIGIN
  };

  MovingObject.DT = 1.0

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    // ctx.drawImage(
    //     this.img,
    //     this.pos[0] - this.radius * 1.7,
    //     this.pos[1] - this.radius * 1.7,
    //     this.radius * 2,
    //     this.radius * 2
    // )
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    ; // default do nothing
  };

  MovingObject.prototype.isCollision = function (entity) {
    var dist = Asteroids.Util.dist(this.pos, entity.pos);
    return dist < (this.radius + entity.radius);
  };

  // for relativistic velocities we need a lorentz transformation

  MovingObject.prototype.sumVelocities = function (vel1, vel2) {
    return [ vel1[0] + vel2[0], vel1[1] + vel2[1] ]
  };

  MovingObject.prototype.move = function () {
    var relVel = this.sumVelocities(this.vel, this.frameVelocity)
    this.pos = [
      this.pos[0] + relVel[0] * MovingObject.DT,
      this.pos[1] + relVel[1] * MovingObject.DT
    ]

    this.pos = this.game.wrap(this.pos)
  };

  MovingObject.prototype.destroy = function () {
    this.game.remove(this)
  }

})();
