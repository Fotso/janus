module.exports = {
	'secret': 'devdacticIsAwesome',
	'database': 'mongodb://localhost:27017/janus',
	'database_mlab': 'mongodb://theophraste:theophraste@ds057176.mlab.com:57176/janus',
	'database_gc': 'mongodb:///opt/bitnami/mongodb/tmp/mongodb-27017.sock/janus',
	authentication: function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, config.secret);
			User.findOne({
				username: decoded.username
			}, function(err, user) {
				if (err){
					return res.status(403).send({success: false, msg: 'No token provided.'});
				};
				if (!user) {
					return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
				} else {
					db.users.find({}, function(err, users) {
						if (err) {
							res.json({success: false, msg: err});
						}
						res.json(JSON.stringify(users));
					});
				}
			});
		} else {
			return res.status(403).send({success: false, msg: 'No token provided.'});
		}
	}
}