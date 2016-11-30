var notification = {};
function ProductManagement(connection) {
    this.connection = connection
};

ProductManagement.prototype.get_all_product = function(callback) {
    var collection = this.connection.collection('product');
    var get_success = function(result) {
        return callback(false, result.ops);
    };
    var get_failure = function(err) {
        notification.message = "add failure";
        notification.error = err;
        return callback(true, notification);
    };

    collection.find().toArray(function (err, result) {
      if (err) {
      	notification.message = "can not get";
        callback(true, notification);
      } 
      else {
 		callback(false,result);       
      }
    });
}

ProductManagement.prototype.search_product_by_name = function(keyword, callback) {
    var collection = this.connection.collection('product');
    var _keyword = ".*"+keyword+".";
    var searchSuccess = function(product) {
        return callback(false,product.ops);
    };
    var searchFalure = function(err) {
        return callback(true,err);
    };
    collection.find({product_name: {$regex: keyword, $options:"i"}}).toArray(function (err, result) {
      if (err) {
        notification.message = "can not get";
        return callback(true, notification);
      } 
      else {
        return callback(false,result);       
      }
    });
};

ProductManagement.prototype.get_product_by_provider_id = function(provider_id, callback) {
    var collection = this.connection.collection('product');
    var searchSuccess = function(product) {
        return callback(false,product.ops);
    };
    var searchFalure = function(err) {
        return callback(true,err);
    };
    collection.find({provider_id: provider_id}).toArray(function (err, result) {
      if (err) {
        notification.message = "can not get";
        return callback(true, notification);
      } 
      else {
        return callback(false,result);       
      }
    });
};
module.exports = ProductManagement;