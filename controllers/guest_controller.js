var GuestMamagement = require('../models/guest_management.js');
var ProductMamagement = require('../models/product_management.js');
var database = require('../db/mongo.service.js');
var User = require('../entities/user.js')
var connection = database.getConnection();
var guestManagement = new GuestMamagement(connection);	
var productManagement = new ProductMamagement(connection);	

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
			return res.status(500).send(result.message);
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
			return res.status(500).send(result.message);
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