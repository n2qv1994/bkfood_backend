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
    //   product.setProductName(req.body.product_name);
    // product.setProviderId(req.body.provider_id)
    // product.setDescription(req.body.description);

    // product.setUnit(req.body.unit);
    // product.setCategory(req.body.category);
    // product.setImage(req.body.image);

    var editFail = function(err) {
        return callback(true, err);
    };
    // collection.update({ _id: product_id }, { $set:{ description: "xinh"}})
    //     .then(editSuccess)
    //     .catch(editFail);
    collection.findOne({_id:product_id})
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err){
        console.log(err);
    })
    // collection.find("582ec2458c3aef1caa9ac3f9").toArray(function(err, result) {
    //     if (err) {
    //         console.log(err);
    //     } else if (result.length) {
    //         console.log('Found:', result);
    //     } else {
    //         console.log('No document(s) found with defined "find" criteria!');
    //     }
    // });
}

module.exports = ProviderManagement;
