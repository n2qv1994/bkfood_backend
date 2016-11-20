function CustomerManagement(connection) {
    this.connection = connection;
};


var notification = {}

CustomerManagement.prototype.sign_out = function(user, callback) {
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
CustomerManagement.prototype.deleteAccount = function(user, callback) {
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

CustomerManagement.prototype.upgradeToProvider = function(user, callback) {
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
                location: user.location,
                time_begin: user.time_begin,
                time_end: user.time_end,
                radius: user.radius,
                role: 1
            }
        })
        .then(NotifyUpgradeSuccess)
        .catch(notifyUpgradeFail);
};

module.exports = CustomerManagement;
