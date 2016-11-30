function AdminManagement (connection) {
    this.connection = connection;
}

var notifycation = {}

AdminManagement.prototype.add_mod = function(mod, callback) {
    var collection = this.connection.collection('manager');

    var addSuccess = function(result) {
        return callback(false,result.ops);
    };
    var addFailure = function(err){
        return callback(true,err);
    };
    var creatMod = function(_mod){

        if( _mod == null || _mod == "" || _mod == undefined) {
            mod.status = true;
            mod.role = 1;
            collection.insert(mod)
                .then(addSuccess)
                .catch(addFailure);
        } else {
            notifycation.message = "usename is exist";
            return callback(true, notifycation.message);
        }
    };

    collection.findOne({username : mod.username})
        .then(creatMod)
        .catch(function(err) {
             return addFailure(err);
        });

};

AdminManagement.prototype.delete_mod = function(mod, callback) {
    var collection = this.connection.collection('manager');

    var deleteSuccess = function() {
        notifycation.message = "delete success!";
        return callback(false,notifycation.message);
    };

    var deleteFailure = function(err) {
        notifycation.message = "delete error!";
        notifycation.err = err;
        return callback(true,notifycation);
    };

    collection.deleteOne({username : mod.username})
        .then(deleteSuccess)
        .catch(deleteFailure);
};

AdminManagement.prototype.add_category = function(category, callback) {
    var collection = this.connection.collection('category');

    var addSuccess = function(result) {

        return callback(false,result.ops);
    };

    var addFailure = function(err) {
        return callback(true,err);
    };

    category.categoryCode = -1;

    this.computeCategoryCode(collection, function(err, result){
        if(!err) {
            category.categoryCode = result;
        }
        category.categoryCode = result;
    });

    collection.findOne({name : category.name})
        .then(function (_category) {
            if(_category == null || _category == "" || _category == undefined) {

                collection.insert(category)
                    .then(addSuccess)
                    .catch(addFailure);
            } else {
                notifycation.message = "category is exist";
                return callback(true,notifycation.message);
            }

        })

};

AdminManagement.prototype.computeCategoryCode = function(collection, callback){
    //var array categoryCodes = [];

    collection.find().toArray(function (err, arr) {
        if(!err) {
             var categoryCode = -1;
            for(var i = 0; i < arr.length; i++) {
                if(categoryCode < arr[i].categoryCode) {
                     categoryCode = arr[i].categoryCode;
                 }
             }
             categoryCode = categoryCode + 1;
             return callback(false, categoryCode);

        } else {
            return callback(true, -1);
        }

    });
}
AdminManagement.prototype.edit_category = function(category, callback) {

    var collection = this.connection.collection('category');

    var editSuccess = function(result) {
        return callback(false,result.ops);
    };

    var editFailure = function(err) {
        return callback(true,err);
    };

    collection.update({categoryCode : category.categoryCode}, {
        $set: {
            name : category.name
        }
    })
        .then(editSuccess)
        .catch(editFailure);
};

AdminManagement.prototype.delete_category = function(category, callback) {

    var collection = this.connection.collection('category');

    var deleteSuccess = function(result) {
        notifycation.message = "delete success!";
        return callback(false,notifycation.message);
    };

    var deleteFailure = function(err) {
        notifycation.message = "delete failure!"
        notifycation.err = err;
        return callback(false, notifycation);
    };

    collection.deleteOne({categoryCode : category.categoryCode})
        .then(deleteSuccess)
        .catch(deleteFailure);
};
module.exports = AdminManagement;
