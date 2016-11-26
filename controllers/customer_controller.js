var CustomerManagement = require('../models/customer_management.js');
var database = require('../db/mongo.service');
// var User = require('../entities/user');
var connection = database.getConnection();
var customerManagement = new CustomerManagement(connection);

module.exports.sign_out = function(req, res) {
    var user = {};
    user.username = req.params.username;
    customerManagement.sign_out(user, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
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
        return res.status(200).send(result);
    });
};

module.exports.upgradeToProvider = function(req, res) {
    var user = {};
    user.username = req.body.username;
    user.location = req.body.location;
    user.time_begin = req.body.time_begin;
    user.time_end = req.body.time_end;
    user.radius = req.body.radius;

    customerManagement.upgradeToProvider(user, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });

};

// module.exports.editProfile = function(req, res) {
//     var user = {}
//     user.username = req.body.username;
//     user.password = req.body.password;
//     user.email = req.body.email;
//     user.name = req.body.name;
//     user.sex = req.body.sex;
//     user.phone = req.body.phone;
//     user.location = req.body.location;
//     user.avatar = req.body.avatar;
// }
