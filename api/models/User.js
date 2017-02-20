/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 var bcrypt = require('bcrypt');
 var randtoken = require('rand-token');

module.exports = {

  attributes: {

    schema: true,

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
    },

    vehicles: {
      collection: 'vehicle',
      via: 'owners'
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

// Method to save generate account confirmation token and send a mail with that token
afterCreate: function(user, cb) {
  User.update({email: user.email}, { confirmation_token: randtoken.generate(16) })
  .exec(function(err, record) {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      MailerService.send_confirmation_mail(record[0]);
      cb();
    }
  });
},

comparePassword: function(password, user, cb) {
  bcrypt.compare(password, user.password, function (err, match) {
    if(err) cb(err);
    if(match) {
      cb(null, true);
    } else {
      cb(err);
    }
  })
}
}
