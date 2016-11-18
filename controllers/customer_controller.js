var CustomerManagement = require('../models/customer_management.js');
var database = require('../db/mongo.service');
var connection = database.getConnection();
var customerManagement = new CustomerManagement(connection);

module.exports.sign_out = function(req, res) {
    var user = {};
    user.username = req.params.username;
    customerManagement.sign_out(user, function(err) {
        if (err) {
            return res.status(500);
        }
        return res.status(201);
    });
};

module.exports.deleteAccount = function(req, res) {
    var user = {};
    user.username = req.params.username;
    user.password = req.params.password;

    customerManagement.deleteAccount(function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};
