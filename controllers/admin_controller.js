var Admin_management = require('../models/admin_management');

var database = require('../db/mongo.service');
var connection = database.getConnection();
var adminManagement = new Admin_management(connection);

module.exports.add_mod = function (req, res) {
    var mod = {};
    mod.username = req.body.username;
    mod.password = req.body.password;

    adminManagement.add_mod(mod, function(err, result) {
        if(err) {
            return res.status(500).send(result);
        } else {
            return res.status(201).send(result);
        }
    })
};

module.exports.delete_mod = function(req, res) {
    var mod = {};
    mod.username = req.body.username;
    adminManagement.delete_mod(mod, function(err, result) {
        if(err) {
            return res.status(500).send(result);
        }

        return res.status(200).send(result);
    });
};

module.exports.add_category = function(req, res) {
    var category = {};
    category.name = req.body.name;
    adminManagement.add_category(category, function(err, result){
        if(err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.edit_category = function(req, res) {
    var category = {};
    category.name = req.body.name;
    category.categoryCode = req.body.categoryCode;
    adminManagement.edit_category(category,function (err,result) {
        if(err) {
            return res.status(500).send(result);
        }

        return res.status(200).send(result);
    })

};

module.exports.delete_category = function(req, res) {
    var category = {};
    category.categoryCode = req.body.categoryCode;

    adminManagement.delete_category(category, function(err, result){
        if(err) {
            return res.status(500).send(result);
        }

        return res.status(200).send(result);
    });
};

