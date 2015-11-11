(function () {
  if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  var inherits = Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function(){ this.constructor = ChildClass; };
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  var randomVec = Util.randomVec = function (magnitude) {
    var theta = math.random() * 2 * math.PI;
    var pos = [];
    pos[0] = magnitude * math.cos(theta);
    pos[1] = magnitude * math.sin(theta);

    return pos;
  };

  // gets the distance between two positions
  var vecDiffMag = Util.vecDiffMag = function (pos1, pos2) {
    return vecNorm(vecDiff(pos1, pos2));
  };

  // finds the vector pointing from pos1 to pos2
  var vecDiff = Util.vecDiff = function (pos1, pos2) {
    return [pos1[0] - pos2[0], pos1[1] - pos2[1]];
  };

  var vecSum = Util.vecSum = function (vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
  };

  // gets the magnitude of a vector
  var vecNorm = Util.vecNorm = function (vx, vy) {
    return math.sqrt(vx * vx + vy * vy);
  };

  // get angle of vector wrt x-axis
  var getTheta = Util.getTheta = function (vx, vy) {
    if (vx === 0) {
      if (vy >= 0) { return math.PI/2; }
      else {return -math.PI/2;}
    }

    return math.atan2(vy , vx);
  };

  var rotVec = Util.rotVec = function (theta, vx, vy) {
    if (vx === 0 && vy === 0) { return [0, 0];}
    var z = math.complex(vx, vy);
    z = math.multiply(
        math.complex(math.cos(theta), math.sin(theta)),
        z);
    return [z.re, z.im];
  };

})();
