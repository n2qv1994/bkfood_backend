var notification = {};

function ProviderManagement(connection) {
    this.connection = connection;
};

ProviderManagement.prototype.add_product = function(product, callback) {
    var collection = this.connection.collection('product');
    var add_success = function(result) {
        return callback(false, result.ops);
    };
    var add_failure = function(err) {
        notification.message = "add failure";
        notification.error = err;
        return callback(true, notification);
    };

    collection.insert(product)
        .then(add_success)
        .catch(add_failure);

};

ProviderManagement.prototype.edit_product = function(_id, product, callback) {
    var collection = this.connection.collection('product');
    var editSuccess = function(product) {
        notification.message = "success";
        return callback(false, notification);
    };
    var editFail = function(err) {
        return callback(true, err);
    };
    collection.update({ _id: _id }, { 
        $set:{ 
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            unit:product.unit,
            category: product.category,
            image: product.image
        }
    })
    .then(editSuccess)
    .catch(editFail);
};

ProviderManagement.prototype.get_product_by_id = function() {
    var collection = this.connection.collection('product');
    collection.findOne({_id:product_id})
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err){
        console.log(err);
    })
};

ProviderManagement.prototype.delete_product = function(product_id, callback) {
    var collection = this.connection.collection('product');
    var deleteSuccess = function (product){
        notification.message = "success";
        return callback(false, notification);
    };
    var deleteFalure = function(err){
        return callback(true,err);
    }
    collection.deleteOne({_id: product_id})
    .then(deleteSuccess)
    .catch(deleteFalure);
}


module.exports = ProviderManagement;
