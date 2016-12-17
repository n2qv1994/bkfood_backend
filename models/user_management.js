var notification = {};
var ObjectID = require('mongodb').ObjectID;


function UserManagement(connection) {
    this.connection = connection;
};

UserManagement.prototype.sign_out = function(user, callback) {
    var collection = this.connection.collection('customer');


    var notifyLogoutSuccess = function(_user) {
        notification.message = "success";
        return callback(false, notification);
    };

    var notifyLogoutFail = function(err) {
        return callback(true, err);
    };
    collection.update({ username: user.username }, { $set: { status: false } })
        .then(notifyLogoutSuccess)
        .catch(notifyLogoutFail);
};


//Xoa tai khoan cua Customer
UserManagement.prototype.deleteAccount = function(user, callback) {
    var collection = this.connection.collection('customer');

    var deleteUser = function(_user) {

        var notifyDeleteSuccess = function() {
            notification.message = "Your account is deleted!";
            return callback(false, notification);
        };

        var notifyDeleteFailure = function(err) {
            notification.message = "ERROR!";
            notification.error = err;
            return callback(true, notification);
        };

        if (_user == null) {
            notification.message = "Password is incorrect!";
            return callback(true, notification);
        }
        collection.deleteOne({ username: user.username })
            .then(notifyDeleteSuccess)
            .catch(notifyDeleteFailure);

    };

    var notifyFailure = function(err) {
        notification.message = "ERROR!";
        notification.error = err;
        return callback(true, notification);
    };

    collection.findOne({ username: user.username, password: user.password })
        .then(deleteUser)
        .catch(notifyFailure);
};

UserManagement.prototype.upgradeToProvider = function(user, callback) {
    var collection = this.connection.collection('customer');

    var NotifyUpgradeSuccess = function(_user) {
        if (_user = null) {
            notification.message = "Fail to upgrade!";
            return callback(true, notification);
        }
        notification.message = "Your account is upgraded!";
        return callback(false, notification);
    };

    var notifyUpgradeFail = function(err) {
        notification.message = "Fail to upgrade!";
        return callback(true, notification);
    };

    collection.update({ username: user.username }, {
            $set: {
                // time_begin: user.time_begin,
                // time_end: user.time_end,
                radius: user.radius,
                role: true
            }
        })
        .then(NotifyUpgradeSuccess)
        .catch(notifyUpgradeFail);
};

UserManagement.prototype.edit_profile = function(user, callback) {
    var collection = this.connection.collection('customer');
    var editSuccess = function(product) {
        notification.message = "success";
        return callback(false, notification);
    };
    var editFail = function(err) {
        notification.message = "error:" + err;
        return callback(true, notification);
    };
    collection.update({ _id: user.user_id }, {
            $set: {
                name: user.name,
                password: user.password,
                email: user.email,
                location: user.location,
                phone: user.phone,
            }
        })
        .then(editSuccess)
        .catch(editFail);
};

UserManagement.prototype.get_all_users = function(callback) {
    var collection = this.connection.collection('customer');
    var get_success = function(result) {
        return callback(false, result.ops);
    };
    var get_failure = function(err) {
        notification.message = "add failure";
        notification.error = err;
        return callback(true, notification);
    };

    collection.find().toArray(function(err, result) {
        if (err) {
            notification.message = "can not get";
            callback(true, notification);
        } else {
            callback(false, result);
        }
    });
}

UserManagement.prototype.create_user = function(user, callback) {
    var collection = this.connection.collection('customer');
    var register_success = function(result) {
        return callback(false, result.ops);
    };
    var register_failure = function(err) {
        notification.message = "register failure";
        return callback(true, notification);
    };
    collection.findOne({ username: user.username })
        .then(function(_user) {
            if (_user == null || _user == "" || user == undefined) {
                collection.insert(user)
                    .then(register_success)
                    .catch(register_failure);
            } else {
                notification.message = "username existed";
                return callback(true, notification)
            }
        })
        .catch(function(err) {
            return callback(true, err);
        });
};

UserManagement.prototype.login = function(user, callback) {
    var collection = this.connection.collection('customer');
    var success = function(_user) {
        if (_user == null || _user == "" || user == undefined) {
            notification.message = "username incorrect";
            return callback(true, notification);
        } else {
            if (_user.password === user.password) {
                collection.update({ username: user.username }, { $set: { status: true } })
                    .then(function(result) {
                        return callback(false, _user);
                    })
                    .catch(function(err) {
                        notification.message = "login false";
                        notification.error = err;
                        return callback(true, notification);
                    });
            } else {
                notification.message = "password incorrect";
                return callback(true, notification);
            }
        }
    };

    var error = function(err) {
        notification.message = "login false";
        notification.error = err;
        return callback(true, notification);
    };

    collection.findOne({ username: user.username })
        .then(success)
        .catch(error);
};

UserManagement.prototype.findById = function(id, callback) {
    var collection = this.connection.collection('customer');
    // var ObjectId =  'ObjectId("'+id+'")';
    var ObjectId = new ObjectID(id);
    collection.find({ _id : ObjectId }, function(err, user) {    
        return callback(err, user);
    })
};
UserManagement.prototype.add_product = function(product, callback) {
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

UserManagement.prototype.edit_product = function(_id, product, callback) {
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

UserManagement.prototype.get_product_by_id = function() {
    var collection = this.connection.collection('product');
    collection.findOne({_id:product_id})
    .then(function(result) {
        console.log(result);
    })
    .catch(function(err){
        console.log(err);
    })
};

UserManagement.prototype.delete_product = function(product_id, callback) {
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


module.exports = UserManagement;