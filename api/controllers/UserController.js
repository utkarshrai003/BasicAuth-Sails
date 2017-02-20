/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	signup: function(req, res) {
		params = req.allParams();

		if (!params.email || !params.password) {
			res.send(400, {error: 'Both email and password required to create an account.'});
		}

    User.create(params)
		.exec(function(err, record) {
			if (err) { res.send(400, {error: err}) }
		  res.send(200, {data: record});
	 });
 },

 index: function(req, res) {
	 User.find({}).exec(function(err, records) {
		 res.send( 200, {data: records} );
	 });
 }

};
