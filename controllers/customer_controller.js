var CustomerManagement = require('../models/customer_management.js');
var database = require('../db/mongo.service');
// var User = require('../entities/user');
var connection = database.getConnection();
var customerManagement = new CustomerManagement(connection);

module.exports.sign_out = function(req, res) {
    var user = {};
    user.username = req.params.username;
    customerManagement.sign_out(user, function(err,result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.deleteAccount = function(req, res) {
    var user = {};
    user.username = req.body.username;
    user.password = req.body.password;
    customerManagement.deleteAccount(user, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.upgradeToProvider=function(req, res){
	var user= {};
	user.username=req.body.username;
	user.password=req.body.password;

	customerManagement.upgradeToProvider(user, function(err, result){
		
	});

};
