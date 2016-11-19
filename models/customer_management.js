function CustomerManagement(connection) {
    this.connection = connection;
};

var notification = {};

var verifyUser = function(user) {
    var collection = this.connection.collection('customer');

    collection.findOne({ username: user.username, password: user.password })
        .then(function() {
            return true;
        })
        .catch(function() {
            return false;
        });
};

CustomerManagement.prototype.sign_out = function(user, callback) {
    var collection = this.connection.collection('customer');

    var notifyLogoutSuccess = function(_user) {
        notification.message = "success";
        return callback(false,notification);
    };

    var notifyLogoutFail = function(err) {
        return callback(true,err);
    };
    collection.update({ username: user.username },{ $set:{ status: false }})
        .then(notifyLogoutSuccess)
        .catch(notifyLogoutFail);
};

CustomerManagement.prototype.deleteAccount = function(user, callback) {
    var collection = this.connection.collection('customer');

    var notifyDeleteSuccess = function(result) {
        notification.message = "Your account is deleted!";
        return callback(false, notification);
    };

    var notifyDeleteFailure = function(err) {
        notification.message = "ERROR!";
        notification.error = err;
        return callback(true, notification);
    };

    if (verifyUser(collection, user)) {
        collection.deleteOne({ username: user.username })
            .then(notifyDeleteFailure)
            .catch(notifyDeleteSuccess);
    }
};

module.exports = CustomerManagement;
