/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// POST /sigin
	signin: function(req, res) {
		params = req.allParams();

		if(!params.email || !params.password) {
			return res.send(400, { error: "Both email and password are required to login"})
		}

		if (params.password !== params.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
    }

		User.findOne({email: params.email}).exec(function(err, record) {
			if(!record) {
				return res.send(401, { error: "No such user" })
			}

			User.comparePassword(params.password, record, function(err, match) {
				if(err) {
					res.send(400, {error: "Email and Password do not match"})
				}

				if(match) {
					res.send(200, {user: record, token: JWTService.issue_token(record)} )
				}
			});
		});
	}
};
