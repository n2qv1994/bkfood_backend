var ModeratorMamagement = require('../models/manager_management.js');
var CustomerManagement = require('../models/customer_management.js');
var ObjectID = require('mongodb').ObjectID;
var database = require('../db/mongo.service.js');
var connection = database.getConnection();

var customerManagement = new CustomerManagement(connection);
var moderatorManagement = new ModeratorMamagement(connection);

module.exports.signin = function(req, res) {
    var manager = {};
    console.log("signin");
    manager.username = req.body.username;
    manager.password = req.body.password;

    moderatorManagement.findManager(manager, function(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(201).send(result);
    });
};

// Xem va xoa cac san pham khong hop le
module.exports.getNewProduct = function(req, res) {
    var category = req.params.category;

    moderatorManagement.getNewProduct(category, function(err, result) {
        if (err) {
            return res.status(404).send(err);
        }
        return res.status(200).send(result);
    });

};

// Doi mat khau cua tai khoan quan ly va duoc admin ke thua
module.exports.changePassword = function(req, res) {
    var manager = {};
    manager.username = req.body.username;
    manager.password = req.body.password;
    manager.newpassword = req.body.newpassword;

    moderatorManagement.changePassword(manager, function(err, result) {
        if (err) {
            return res.status(404).send(err);
        }
        return res.status(200).send(result);
    });
};
// Xoa san pham khong hop le
module.exports.deleteProduct = function(req, res) {
    var product = {};
    product._id = new ObjectID(req.body._id);

    moderatorManagement.deleteProduct(product, function(err, result) {
        if (err) {
            return res.status(404).send(err);
        }
        return res.status(200).send(result);
    });
};

module.exports.get_all_users = function(req,res) {
    customerManagement.get_all_users(function(err,result) {
        if(err){
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.delete_user = function(req, res) {
    console.log("1:"+ req.params.user_id);
    var user_id = ObjectID(req.params.user_id);
    moderatorManagement.delete_user(user_id, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(200).send(result);
    });
};

