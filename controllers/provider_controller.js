var ProviderManagement = require('../models/provider_management.js');
var database = require('../db/mongo.service');
var Product = require('../entities/product.js')
var ObjectID = require('mongodb').ObjectID;
var connection = database.getConnection();
var providerManagement = new ProviderManagement(connection);

module.exports.add_product = function(req, res) {
    var new_product = new Product();
    new_product.setId(new ObjectID());
    new_product.setProductName(req.body.product_name);
    new_product.setProviderId(req.body.provider_id)
    new_product.setDescription(req.body.description);
    new_product.setPrice(req.body.price);
    new_product.setUnit(req.body.unit);
    new_product.setCategory(req.body.category);
    new_product.setImage(req.body.image);
    providerManagement.add_product(new_product, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.edit_product = function(req, res) {
    var product = new Product();
    var product_id = ObjectID(req.body.product_id);  
    product.setId(product_id);
    product.setProductName(req.body.product_name);
    product.setProviderId(req.body.provider_id)
    product.setDescription(req.body.description);
    product.setPrice(req.body.price);
    product.setUnit(req.body.unit);
    product.setCategory(req.body.category);
    product.setImage(req.body.image);

    providerManagement.edit_product(product, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};

module.exports.get_product = function(req, res) {

};

module.exports.delete_product = function(req, res) {
    product_id = new ObjectID(req.body.product_id);
    providerManagement.delete_product(product_id, function(err, result) {
        if (err) {
            return res.status(500).send(result);
        }
        return res.status(201).send(result);
    });
};