(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }


  var MovingObject = Asteroids.MovingObject = function (opts) {
    this.pos = opts.pos || 0; // relative to center
    this.vx = opts.vx || 0;
    this.vy = opts.vy || 0;
    this.radius = opts.radius || 100;
    this.color = opts.color || "yellow";
    this.game = opts.game;
    // this.vS = this.game.ship.vel;
    this.ship = this.game.ship;
    this.img = opts.img;
    this.frameOrigin = this.game.ORIGIN;
    this.posRel = 0;
  };

  MovingObject.DT = 1.0;

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


  };

  MovingObject.prototype.setRelativeVelocity = function () {
    //return [ vel1[0] + vel2[0], vel1[1] + vel2[1] ]
    // relativistic velocity addition
    // the velocity in the frame of the ship
    // need to multiply angle by (-1) to make it rotate to frame where ship is
    // travelling in x-direction
    debugger
    var vRot, vx, vy, vS, vxRel, vyRel, v;
    var spdOfLightSqd = Asteroids.Game.cSpeedOfLight * Asteroids.Game.cSpeedOfLight;

    vRot = Asteroids.Util.rotVec((-1)*this.ship.angle, this.vx, this.vy);

    // rotated
    vx = vRot[0];
    vy = vRot[1];
    vS = this.ship.speed();
    vxRel = (vx + vS) / (1 + vS * vx / spdOfLightSqd);
    vyRel = math.sqrt(1 - vS * vS / spdOfLightSqd) * vy /
                  (1 + vS * vx / spdOfLightSqd);

    // rotate back
    this.relVel = Asteroids.Util.rotVec(this.ship.angle, vxRel, vyRel);
  };

  MovingObject.prototype.getTransformationMatrix = function (){
    var theta =  Asteroids.Util.getTheta(this.relVel[0], this.relVel[1]);
    var sinTheta = math.sin(theta);
    var cosTheta = math.cos(theta);
    var spdOfLightSqd = Asteroids.Game.cSpeedOfLight * Asteroids.Game.cSpeedOfLight;
    var relSpd = Asteroids.Util.vecNorm(this.relVel[0], this.relVel[1]);

    // 1 / gamma(vrel)
    var scl = math.sqrt(1 - relSpd*relSpd / spdOfLightSqd);
    return [

    ];
  };

  MovingObject.prototype.speed = function () {
    return Asteroids.Util.vecNorm(this.vx, this.vy);
  };

  MovingObject.prototype.move = function () {
    this.setRelativeVelocity();

    // this.pos = [
    //   this.pos[0] + this.vel[0] * MovingObject.DT,
    //   this.pos[1] + this.vel[1] * MovingObject.DT
    // ]
    this.pos = [
      this.pos[0] + this.relVel[0] * MovingObject.DT,
      this.pos[1] + this.relVel[1] * MovingObject.DT
    ];

    //this.pos = this.game.wrap(this.pos)
  };

  MovingObject.prototype.destroy = function () {
    this.game.remove(this);
  };

})();
