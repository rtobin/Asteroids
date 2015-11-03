(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }


  var FrameObject = Asteroids.FrameObject = function (opts) {
    this.pos = opts.pos; // relative to center
    this.vel = opts.vel;
    this.radius = opts.radius;
    this.color = opts.color;
    this.game = opts.game;
    this.DT = 0 //this.game.DT;
  };

  FrameObject.prototype.draw = function(ctx) {
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
  };

  FrameObject.prototype.collideWith = function (otherObject) {
    ; // default do nothing
  };

  FrameObject.prototype.isCollision = function (entity) {
    var dist = Asteroids.Util.dist(this.pos, entity.pos);
    return dist < (this.radius + entity.radius);
  };

  // for relativistic velocities we need a lorentz transformation

  FrameObject.prototype.sumVelocities = function (vel1, vel2) {
    return [ vel1[0] + vel2[0], vel1[1] + vel2[1] ]
  };

  FrameObject.prototype.move = function () {
    var relVel = this.sumVelocities(this.vel, this.frameVelocity)
    this.pos = [
      this.pos[0] + this.relVel[0] * this.DT,
      this.pos[1] + this.relVel[1] * this.DT
    ]

    if (this.game.isOutOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos)
    }
  };

  FrameObject.prototype.destroy = function () {
    this.game.remove(this)
  }

})();
