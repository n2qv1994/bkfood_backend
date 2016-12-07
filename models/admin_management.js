function AdminManagement(connection) {
    this.connection = connection;
};

var notification = {};

AdminManagement.prototype.createModerator = function(manager, callback) {
    var collection = this.connection.collection('manager');

    var notifyFail = function(err) {
        return callback(true, null);
    };

    var processResultVerification = function(moderator) {
        var notifyResultInsert = function(_moderator) {
            notifycation.message = _moderator.ops[0].username + " is inserted!";
            return callback(false, notification);
        };

        if (moderator == null || moderator == "" || moderator == undefined) {
            collection.insertOne(manager)
                .then(notifyResultInsert)
                .catch(notifyFail);
        } else {
            notification.message = "Moderator is existed!";
            return callback(false, notification);
        }
    };

    collection.findOne({ username: manager.username })
        .then(processResultVerification)
        .catch(notifyFail);
};

AdminManagement.prototype.deleteModerator = function(manager, callback) {
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

AdminManagement.prototype.addCategory = function(category, callback) {
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

AdminManagement.prototype.editCategory = function(category, callback) {
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

AdminManagement.prototype.deleteCategory = function(category, callback) {
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

module.exports = AdminManagement;
