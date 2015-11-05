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


  FrameObject.prototype.destroy = function () {
    this.game.remove(this)
  }

})();
