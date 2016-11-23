var GuestMamagement = require('../models/guest_management.js');
var ProductMamagement = require('../models/product_management.js');
var database = require('../db/mongo.service.js');
var User = require('../entities/user.js');
var connection = database.getConnection();
var guestManagement = new GuestMamagement(connection);	
var productManagement = new ProductMamagement(connection);	

// module.exports.sign_up = function(req,res) {
// 	var new_user = {};
// 	new_user.username = req.body.username;
// 	new_user.password = req.body.password;
// 	new_user.email	  = req.body.email;
// 	new_user.name	  = req.body.name;
// 	new_user.sex	  = req.body.sex;
// 	new_user.phone	  = req.body.phone;
// 	new_user.location = req.body.location;
// 	new_user.avatar   = req.body.avatar;
// 	guestManagement.create_user(new_user, function(err,result) {
// 		if(err){
// 			return res.status(500).send(result);
// 		}
// 		return res.status(201).send(result);
// 	});		
// };
module.exports.sign_up = function(req,res) {

	var user = new User();
	user.setUsername(req.body.username);
	user.setPassword(req.body.password);
	user.setEmail(req.body.email);
	user.setName(req.body.name);
	user.setSex(req.body.sex);
	user.setPhone(req.body.phone);
	user.setLocation(req.body.location);
	user.setAvatar(req.body.avatar);
	user.setStatus(false);	
	guestManagement.create_user(user, function(err,result) {
		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});		
};

module.exports.login = function(req, res) {
	var user_login = {};

	user_login.username = req.body.username;
	user_login.password = req.body.password;
	guestManagement.login(user_login, function(err,result) {

		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});		
};

module.exports.search_product_by_name = function(req, res) {

	keyword = req.params.keyword;
	productManagement.search_product_by_name(keyword, function(err,result) {

		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});		
};