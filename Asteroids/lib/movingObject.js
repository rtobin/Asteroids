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
    this.posRel = 0;
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

  MovingObject.prototype.relativePosition = function () {
    //gamma = 1 / Math.sqrt(1 - Math.pow(this.speed(), 2) / Math.pow(Asteroids.Game.cSpeedOfLight, 2));


  }

  MovingObject.prototype.relativeVelocity = function () {
    //return [ vel1[0] + vel2[0], vel1[1] + vel2[1] ]
    // relativistic velocity addition
    // the velocity in the frame of the ship
    var velShip = this.game.ship.vel;
    var velAsty = this.vel;
    // debugger
    var vS = Asteroids.Util.vecNorm(velShip);
    var vA = this.speed();

    // we need the angle of the asteroid velocity with respect to ship velocity
    var theta = Asteroids.Util.getTheta(velAsty) - Asteroids.Util.getTheta(velShip)
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    c = Asteroids.Game.cSpeedOfLight;

    var vRel = Math.sqrt(vA*vA + vS*vS + 2*vS*vA*cosTheta
                - Math.pow(vS*vA*sinTheta / c, 2)) / (1 + vS*vA*cosTheta/(c*c))

    thetaRel =(-1) * Math.atan2( Math.sqrt(1 - vS*vS/(c*c))*vA*sinTheta, vA*cosTheta + vS);
    v = [vRel * Math.cos(thetaRel), vRel * Math.sin(thetaRel)];
    return v;
  };

  MovingObject.prototype.speed = function () {
    return Asteroids.Util.vecNorm(this.vel);
  }

  MovingObject.prototype.move = function () {
    relVel = this.relativeVelocity()
    // this.pos = [
    //   this.pos[0] + this.vel[0] * MovingObject.DT,
    //   this.pos[1] + this.vel[1] * MovingObject.DT
    // ]
    this.pos = [
      this.pos[0] + relVel[0] * MovingObject.DT,
      this.pos[1] + relVel[1] * MovingObject.DT
    ]

    //this.pos = this.game.wrap(this.pos)
  };

  MovingObject.prototype.destroy = function () {
    this.game.remove(this)
  }

})();
