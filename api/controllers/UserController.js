/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	signup: function(req, res) {
		params = req.query;
		if (!params.email || !params.password) {
			res.send(400, {error: 'Both email and password required to create an account.'});
		}

    User.create({
			first_name: params.first_name,
		  last_name: params.last_name,
		  mail: params.email,
		  password: params.password
	  })
		.exec(function(err, record) {
			if (err) { res.send(400, {error: err}) }
			res.send(200, { data: record });
	 });
	}

};
