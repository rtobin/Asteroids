(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx, bg) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.ship;
    this.background = bg
  }

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0]
  };

  GameView.prototype.start = function(){
    var view = this;

    setInterval(function(){
      // view.ctx.drawImage(view.background, 0, 0);
      view.game.moveObjects();
      view.game.draw(view.ctx);
      }, 1000 / Asteroids.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.thrust(move[0], move[1]); });
      // console.log(k);
    });

    // key("space", function () { ship.fireBullet() });
  };

})();
