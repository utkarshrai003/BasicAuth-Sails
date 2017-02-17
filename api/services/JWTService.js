// This service holds the functions for generating and verifying a JSON Web Token

var jwt = require('jsonwebtoken');
var tokenSecret = "secretissecet"; // this must be in configuration

// Generates a token from supplied payload
module.exports.issue_token = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      expiresIn : 180 // Token Expire time
    }
  );
};

// Verifies token on a request
module.exports.verify_token = function(token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback
  );
};
