var ProductManagement = require('../models/product_management.js');
var database = require('../db/mongo.service');
// var Product = require('../entities/product.js')
var ObjectID = require('mongodb').ObjectID;
var connection = database.getConnection();
var productManagement = new ProductManagement(connection);


module.exports.get_all_product = function(req,res) {
	productManagement.get_all_product(function(err,result) {
		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});
};
module.exports.get_product_by_provider_id = function(req,res) {
	var provider_id = req.params.provider_id;
	productManagement.get_product_by_provider_id(provider_id, function(err,result) {
		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});
}
module.exports.get_product_by_category = function(req,res) {
	var category = req.params.category;
	var provider_id = req.params.provider_id;
	productManagement.get_product_by_category(provider_id, category, function(err,result) {
		if(err){
			return res.status(500).send(result);
		}
		return res.status(201).send(result);
	});
}