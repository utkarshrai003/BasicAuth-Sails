/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var token = req.headers.authorization;
  }
  else {
    return res.json(401, {err: 'No Authorization header was found'});
  }

  JWTService.verify_token(token, function (err, payload) {
    if (err) return res.json(401, {err: 'Invalid Token !'});
    req.user = payload; // This is the decrypted token or the payload you provided
  });
};
