const jwt = require("jsonwebtoken");
const secret = require("../config").jwt_secret;

function requireRole(roles) {
  return function(req, res, next) {
    if (!req.token) {
      res.sendStatus(403);
      return;
    }
    for (let role of roles) {
      role = role.toLowerCase();
      if (role === req.token.role.toLowerCase()) return next();
    }
    res.sendStatus(403);
    return;
  };
}

exports.tokenParser = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return next();
  }
  const token = req.headers.authorization.slice(
    7,
    req.headers.authorization.length
  );
  if (!token) return next();
  jwt.verify(token, secret, { algorithm: "HS256" }, (err, decoded) => {
    if (err) {
      return next();
    }
    req.token = decoded;
    return next();
  });
};

exports.requireRole = requireRole;
