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

ProviderManagement.prototype.edit_product = function(product, callback) {
    var collection = this.connection.collection('product');
    var product_id = product.getId();
    console.log(product_id);
    var editSuccess = function(product) {
        notification.message = "success";
        return callback(false, notification);
    };
    var editFail = function(err) {
        return callback(true, err);
    };
    collection.update({ _id: product_id }, { 
        $set:{ 
            product_name: product.getProductName(),
            provider_id: product.getProviderId(),
            description: product.getDescription(),
            price: product.getPrice(),
            unit:product.getUnit(),
            category: product.getCategory(),
            image: product.getImage()
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
