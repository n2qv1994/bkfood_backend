var notification = {};

var ModeratorManagement = function(connection) {
    this.connection = connection;
};

module.exports = ModeratorManagement;

ModeratorManagement.prototype.findManager = function(manager, callback) {
    var collection = this.connection.collection('manager');

    var notifyFindSuccess = function(_manager) {
        if (_manager == null) {
            notification.message = "Username or password is incorrect!";
            return callback(false, notification);
        } else {
            notification.message = "Success!"
            return callback(false, notification);
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
ModeratorManagement.prototype.getNewProduct = function(cate, callback) {
    var collection = this.connection.collection('product');

    var notifyFindSuccess = function(products) {
        if (products == "" || products == null) {
            notification.message = "No product found!";
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
ModeratorManagement.prototype.changePassword = function(manager, callback) {
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
