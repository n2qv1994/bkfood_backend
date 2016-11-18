var database = require('./db/mongo.service');
var connection = database.getConnection();

module.exports.testdb = function(req, rep) {
    var collection = this.connection.collection('customer');

    var success = function(_user){
    	console.log("I'm Giap.");
    };

    var failure = function(err){
    	console.log("I am not Giap.");
    };

    var user = {};
    user.username = req.params.username;
    collection.find({username:'giapvn'})
    .then(success)
    .catch(failure);


};
