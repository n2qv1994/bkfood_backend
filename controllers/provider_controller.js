var ProviderManagement = require('../models/provider_management.js');
var database = require('../db/mongo.service');
var Product = require('../entities/product.js')
var ObjectID = require('mongodb').ObjectID;
var connection = database.getConnection();
var providerManagement = new ProviderManagement(connection);

module.exports.add_product = function(req, res) {
    var new_product = new Product();
    new_product.product_name = req.body.product_name;
    new_product.provider_id = req.body.provider_id;
    new_product.description = req.body.description;
    new_product.price = req.body.price;
    new_product.unit = req.body.unit;
    new_product.category = req.body.category;
    new_product.image = req.body.image;
    providerManagement.add_product(new_product, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.edit_product = function(req, res) {
    var product = new Product();
    var _id = ObjectID(req.body.product_id);
    product.product_name = req.body.product_name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.unit = req.body.unit;
    product.category = req.body.category;
    product.image = req.body.image;

    providerManagement.edit_product(_id, product, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

// module.exports.delete_product = function(req, res) {
//     product_id = new ObjectID(req.body.product_id);
//     providerManagement.delete_product(product_id, function(err, result) {
//         if (err) {
//             return res.status(500).send(result);
//         }
//         return res.status(201).send(result);
//     });
// };
module.exports.delete_product = function(req, res) {
    product_id = new ObjectID(req.params.product_id);
    providerManagement.delete_product(product_id, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};