var notification = {};

var ManagerManagement = function(connection) {
    this.connection = connection;
};

//login
ManagerManagement.prototype.findManager = function(manager, callback) {
    var collection = this.connection.collection('manager');

    var notifyFindSuccess = function(_manager) {
        if (_manager == null) {
            notification.message = "Username or password is incorrect!";
            return callback(false, notification);
        } else {
            return callback(false, _manager);
        }

    };

    var notifyFindFail = function(err) {
        notification.error = err;
        return callback(true, notification);
    };

    collection.findOne({ username: manager.username, password: manager.password })
        .then(notifyFindSuccess)
        .catch(notifyFindFail);
};

// Xem va xoa cac san pham khong hop le 
ManagerManagement.prototype.getNewProduct = function(cate, callback) {
    var collection = this.connection.collection('product');

    var notifyFindSuccess = function(products) {
        if (products == "" || products == null) {
            notification.message = "No product is found!";
            return callback(false, notification);
        }
        return callback(false, notification);
    };

    var notifyFindFail = function(err) {
        notification.error = err;
        notification.message = "ERROR";
        return callback(true, notification);
    };

    collection.find({ category: cate, checked: false }).toArray()
        .then(notifyFindSuccess)
        .catch(notifyFindFail);
};

// Doi password duoc admin ke thua
ManagerManagement.prototype.changePassword = function(manager, callback) {
    var collection = this.connection.collection('manager');

    var notifyFindFail = function(err) {
        notification.message = "ERROR";
        return callback(true, notification);
    };

    var verifyPassword = function(_manager) {

        var notifyChangeFail = function(err) {
            notification.message = "ERROR";
            return callback(true, notification);
        };

        var notifyChanged = function() {
            notification.message = "Password is changed!";
            return callback(false, notification);
        };

        if (_manager.password == manager.password) {
            collection.updateOne({ username: _manager.username }, { $set: { password: manager.newpassword } })
                .then(notifyChanged)
                .catch(notifyChangeFail);
        } else {
            notification.message = "Password is incorrect!";
            return callback(false, notification);
        }
    };

    collection.findOne({ username: manager.username })
        .then(verifyPassword)
        .catch(notifyFindFail);
};

// Xoa san pham khong hop le
ManagerManagement.prototype.deleteProduct = function(product, callback) {
    var collection = this.connection.collection('product');

    var notifyDeleteSuccess = function(pro) {
        notification.message = pro.name + " is deleted!";
        return callback(false, notification);
    };

    var notifyFail = function(err) {
        return callback(true, null);
    };

    collection.deleteOne({ _id: product._id })
        .then(notifyDeleteSuccess)
        .catch(notifyFail);
};

ManagerManagement.prototype.createModerator = function(manager, callback) {
    var collection = this.connection.collection('manager');
    var register_success = function(result) {
        return callback(false, result.ops);
    };
    var register_failure = function(err) {
        notification.message = "register failure";
        return callback(true, notification);
    };
    collection.findOne({ username: manager.username })
        .then(function(_user) {
            if (_user == null || _user == "" || _user == undefined) {
                collection.insert(manager)
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

ManagerManagement.prototype.deleteModerator = function(manager, callback) {
    var collection = this.connection.collection('manager');

    var verrifyAdmin = function(admin) {
        var notifyDeleteSuccess = function(moderator) {
            notification.message = "Deleted success!";
            return callback(false, notification);
        };

        if (manager.password == admin.password) {
            collection.deleteOne({ username: manager.username })
                .then(notifyDeleteSuccess)
                .catch(function(err) {
                    return callback(true, null);
                });
        } else {
            notification.message = "Password is incorrect!";
            return callback(false, notification);
        }

    };

    collection.findOne({ username: "admin" })
        .then(verrifyAdmin)
        .catch(function(err) {
            return callback(true, null);
        });
};

ManagerManagement.prototype.addCategory = function(category, callback) {
    var collection = this.connection.collection('category');

    var processResult = function(cate) {
        var notifyInsertSuccess = function(_cate) {
            notification.message = _cate.ops[0].name + " is created!";
            return callback(false, notification);
        };

        if (cate == null || cate == "" || cate == undefined) {
            collection.insertOne(category)
                .then(notifyInsertSuccess)
                .catch(function(err) {
                    return callback(true, null);
                });
        } else {
            notification.message = cate.name + " existed";
            return callback(false, notification);
        }
    };

    collection.findOne({ name: category.name })
        .then(processResult)
        .catch(function(err) {
            return callback(true, null);
        });
};

ManagerManagement.prototype.editCategory = function(category, callback) {
    var collection = this.connection.collection('category');

    var notifyEditSuccess = function(result) {
        notification.message = "Edit success!";
        return callback(false, notification);
    };

    collection.updateOne({ _id: category._id }, {
            $set: {
                name: category.name
            }
        })
        .then(notifyEditSuccess)
        .catch(function(err) {
            return callback(true, null);
        });
};

ManagerManagement.prototype.deleteCategory = function(category, callback) {
    var collection = this.connection.collection('category');
    var managerCollection = this.connection.collection('manager');

    var verrifyAdmin = function(admin) {
        var notifyDeleteSuccess = function() {
            notification.message = "Deleted success!";
            return callback(false, notification);
        };

        if (category.password == admin.password) {
            collection.deleteOne({ _id: category._id })
                .then(notifyDeleteSuccess)
                .catch(function(err) {
                    return callback(true, null);
                });
        } else {
            notification.message = "Password is incorrect!";
            return callback(false, notification);
        }

    };

    managerCollection.findOne({ username: "admin" })
        .then(verrifyAdmin)
        .catch(function(err) {
            return callback(true, null);
        });
};

module.exports = ManagerManagement;