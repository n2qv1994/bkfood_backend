var AdminManagement = function(connection) {
    this.connection = connection;
};

var notification = {};

module.exports = AdminManagement;

AdminManagement.prototype.createModerator = function(manager, callback) {
    var collection = this.connection.collection('manager');

    var notifyFindFail = function(err) {
        notification.message("ERROR");
        notification.error = err;
        return callback(true, notification);
    };

    var processSearchResult = function(_manager) {
        var notifyCreateSuccess = function(input) {
            notification.message = "Created!";
            return callback(false, notification)
        };

        var notifyCreateFail = function(err) {
            notification.message = "ERROR";
            notification.err = err;
            return callback(false, notification);
        };

        if (_manager == null || _manager == "") {
            collection.insertOne(manager)
                .then(notifyCreateSuccess)
                .catch(notifyCreateFail);
        }
        notification.message = "Account is existed!";
        return callback(false, notification);
    };

    collection.findOne({ username: manager.username })
        .then(processSearchResult)
        .catch(notifyFindFail);
};

AdminManagement.prototype.deleteModerator = function(request, callback) {
    var collection = this.connection.collection('manager');

    var notifyFindFail = function(err) {
        notification.message = "ERROR";
        notification.error = err;
        return callback(true, notification);
    };

    var verifyPassword = function(_admin) {
        var notifyFail=function(err){
            notification.message = "ERROR";
            notification.error = err;
            return callback(true, notification);
        };

        var deleteAccount=function(_moderator){
            notification.message="Account is deleted";
            return callback(false, notification);
        };

        if (_admin.password == request.password) {
            collection.remove({ username: request.username })
                .then(deleteAccount)
                .catch(notifyFail);
        }
        else{
            notification.message = "Password is incorrect!";
            return callback(false, notification);
        }
    };

    collection.findOne({ username: "admin" })
        .then(verifyPassword)
        .catch(notifyFindFail);
};
