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