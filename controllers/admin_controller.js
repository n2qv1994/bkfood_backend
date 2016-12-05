var AdminManagement = require('../models/admin_management');
var ObjectID = require('mongodb').ObjectID;

var database = require('../db/mongo.service');
var connection = database.getConnection();
var adminManagement = new AdminManagement(connection);

module.exports.addModerator = function(req, res) {
    var manager = {};
    manager.username = req.body.username;
    manager.password = req.body.password;
    manager.category = req.body.categoryID;
    manager.role = req.body.role;
    manager.status = false;

    adminManagement.verifyModerator(manager, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        } else {
            return res.status(201).send(result);
        }
    })
};

module.exports.deleteModerator = function(req, res) {
    var manager = {};
    manager.username = req.body.username; //username cua mod
    manager.password = req.body.password; //pass cua admin

    adminManagement.deleteModerator(manager, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
    });
};

module.exports.addCategory = function(req, res) {
    var category = {};
    category.name = req.body.name;
    adminManagement.addCategory(category, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.editCategory = function(req, res) {
    var category = {};
    category._id = new ObjectID(req.body._id);
    category.name = req.body.name;
    adminManagement.editCategory(category, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }

        return res.status(200).send(result);
    })

};

module.exports.deleteCategory = function(req, res) {
    var category = {};
    category._id = new ObjectID(req.body._id); //id cua category
    category.password = req.body.password; //pass cua admin

    adminManagement.deleteCategory(category, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
    });
};
