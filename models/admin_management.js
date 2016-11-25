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
