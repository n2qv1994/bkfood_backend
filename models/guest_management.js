var notification = {};
var ObjectID = require('mongodb').ObjectID;
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
                        notification.message = "login false";
                        notification.error = err;
                        return callback(true, err);
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

GuestManagement.prototype.findById = function(id, callback) {
    var collection = this.connection.collection('customer');
    // var ObjectId =  'ObjectId("'+id+'")';
    var ObjectId = new ObjectID(id);
    collection.find({ _id : ObjectId }, function(err, user) {    
        return callback(err, user);
    })
};


GuestManagement.prototype.loginLocal = function(username, password, callback) {
    var collection = this.connection.collection('customer');
    collection.findOne({ username : username }, function(err, user) {
        if (err){
            return callback(err, false);
        }
        if (user.username == username && user.password == password) {
            return callback(null, user);
        }
        else{
            return callback(null,false);
        }
    });
};


module.exports = GuestManagement;