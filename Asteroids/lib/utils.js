(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  var inherits = Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function(){ this.constructor = ChildClass };
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  var randomVec = Util.randomVec = function (magnitude) {
    var theta = Math.random() * 2 * Math.PI;
    var pos = [];
    pos[0] = magnitude * Math.cos(theta);
    pos[1] = magnitude * Math.sin(theta);

    return pos;
  };

  // gets the distance between two positions
  var vecDiffMag = Util.vecDiff = function (pos1, pos2) {
    return vecNorm(vecDiff(pos1, pos2))
  }

  // finds the vector pointing from pos1 to pos2
  var vecDiff = Util.vecDiff = function (pos1, pos2) {
    return [pos1[0] - pos2[0], pos1[1] - pos2[1]]
  }

  // gets the magnitude of a vector
  var vecNorm = Util.vecNorm = function (vec) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1])
  }



})();
