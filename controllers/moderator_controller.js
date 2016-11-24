var ModeratorMamagement = require('../models/moderator_management.js');
var database = require('../db/mongo.service.js');
var connection = database.getConnection();

var moderatorManagement=new ModeratorMamagement(connection);

module.exports.signin = function(req, res){
	var manager={};
	manager.username=req.body.username;
	manager.password=req.body.password;

	moderatorManagement.findManager(manager, function(err, result){
		if (err) {
			return res.status(500).send(err);
		}
		return res.status(201).send(result);
	});
};