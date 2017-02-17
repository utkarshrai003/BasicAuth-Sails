/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    confirmation_token: {
      type: 'string'
    },
    confirmed: {
      type: 'boolean',
      defaultsTo: false
    }

  },

  // Hash and save the password before a user record is created
beforeCreate: function(user, cb) {
  bcrypt.hash(user.password, 10, function(err, hashed_pass) {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      user.password = hashed_pass;
      cb();
    }
  });
},

};
