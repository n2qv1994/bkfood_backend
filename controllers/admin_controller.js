var AdminManagement = require('../models/manager_management.js');
var ObjectID = require('mongodb').ObjectID;

var database = require('../db/mongo.service');
var connection = database.getConnection();
var adminManagement = new AdminManagement(connection);

module.exports.addModerator = function(req, res) {
    var manager = {};
    manager.username = req.body.username;
    manager.password = req.body.password;
    manager.category = req.body.category;
    manager.status = false;

    adminManagement.createModerator(manager, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    })
};

// module.exports.deleteModerator = function(req, res) {
//     var manager = {};
//     manager.username = req.body.username; //username cua mod
//     manager.password = req.body.password; //pass cua admin

//     adminManagement.deleteModerator(manager, function(err, result) {
//         if (err) {
//             return res.status(500).send(result);
//         }
//         return res.status(200).send(result);
//     });
// };

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

module.exports.get_all_mod = function(req,res) {
    adminManagement.get_all_mod(function(err,result) {
        if(err){
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.delete_mod = function(req, res) {
    var mod_id = ObjectID(req.params.mod_id);
    adminManagement.delete_mod(mod_id, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
    });
};