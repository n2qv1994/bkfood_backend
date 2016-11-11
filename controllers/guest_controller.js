var GuestMamagement = require('../models/guest_management.js');
var database = require('../db/mongo.service.js');
var connection = database.getConnection();
var guestManagement = new GuestMamagement(connection);	

module.exports.sign_up = function(req,res) {
	var user = {};
	user.username = req.body.username;
	user.password = req.body.password;
	user.email	  = req.body.email;
	user.name	  = req.body.name;
	user.sex	  = req.body.sex;
	user.phone	  = req.body.phone;
	user.location = req.body.location;
	user.avatar   = req.body.avatar;
	guestManagement.create_user(user, function(err,result) {
		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});		
};

module.exports.login = function(req, res) {
	var user = {};
	user.username = req.params.username;
	user.password = req.params.password;
	console.log(user);
	guestManagement.login(user, function(err,result) {
		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});		
};