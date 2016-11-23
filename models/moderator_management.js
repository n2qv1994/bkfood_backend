var notification = {};

var ModeratorManagement = function(connection){
	this.connection=connection;
};

module.exports = ModeratorManagement;

ModeratorManagement.prototype.findManager = function(manager, callback){
	var collection=this.connection.collection('manager');

	var notifyFindSuccess=function(_manager){
		if(_manager==null){
			notification.message="Username or password is incorrect!";
			return callback(false, notification);
		}else{
			notification.message="Success!"
			return callback(false, notification);	
		}
		
	};

	var notifyFindFail=function(err){
		notification.error=err;
		return callback(true, notification);
	};

	collection.findOne({username: manager.username, password: manager.password})
	.then(notifyFindSuccess)
	.catch(notifyFindFail);
};