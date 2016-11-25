var AdminManagement = require('../models/admin_management.js');
var database = require('../db/mongo.service.js');
var connection = database.getConnection();

var adminManagement = new AdminManagement(connection);

module.exports.addModerator = function(req, res) {
    var manager = {};
    manager.username = req.body.username;
    manager.password = req.body.password;
    manager.category = req.body.category;
    manager.role = 1;
    manager.status = false;

    adminManagement.createModerator(manager, function(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(201).send(result);
    });
};
