var notification = {};

function GuestManagement(connection) {
    this.connection = connection;
};

GuestManagement.prototype.create_user = function(user, callback) {
    var collection = this.connection.collection('customer');
    var register_success = function(result) {
        return callback(false, result.ops);
    };
    var register_failure = function(err) {
        notification.message = "register failure";
        notification.error = err;
        return callback(true, notification);
    };
    collection.findOne({ username: user.username })
        .then(function(_user) {
            if (_user == null || _user == "" || user == undefined) {
                collection.insert(user)
                    .then(register_success)
                    .catch(register_failure);
            } else {
                notification.message = "username is exist";
                return callback(true, notification.message)
            }
        })
        .catch(function(err) {
            return callback(true, err);
        });
};

GuestManagement.prototype.login = function(user, callback) {
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
                        return callback(true, err);
                    });
            } else {
                notification.message = "password incorrect";
                return callback(true, notification);
            }
        }
    };

    var error = function(err) {
        notification.error = err;
        return callback(true, notification);
    };

    collection.findOne({ username: user.username })
        .then(success)
        .catch(error);
};
module.exports = GuestManagement;