var express = require('express');
var bodyParser = require('body-parser');

var dbConfig = require('./config/database.config.json');
var mongoService = require('./db/mongo.service');

var connectionString = "mongodb://"+dbConfig.mongodb.host+":"+dbConfig.mongodb.port+"/"+dbConfig.mongodb.dbname;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);
// app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoService.connect(connectionString, function(err) {
    console.log('connection string:\n' + connectionString);
    if (err) {
        console.log('Unable to connect Mongo DB');
        process.exit(1);
    } else {
        app.use('/api', require('./api/api'));
        app.listen(app.get('port'), function() {      	
            console.log("application started on http://localhost:" + app.get('port') + ";\n please press Ctrl+C to terminate");
        });
    }
});