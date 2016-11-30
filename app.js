var express = require('express');
var bodyParser = require('body-parser');
// var cors         = require('cors');
var dbConfig = require('./config/database.config.json');
var mongoService = require('./db/mongo.service');

var connectionString = "mongodb://" + dbConfig.mongodb.host + ":" + dbConfig.mongodb.port + "/" + dbConfig.mongodb.dbname;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket = io.of('/chat')
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.set('port', process.env.PORT || 3000);

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
        app.get('/chat', function(req, res) {
            res.sendFile(__dirname + '/views/login.html');
        });
        socket.on('connection', function(socket) {
            console.log('a user connected');
        });
        http.listen(app.get('port'), function() {
            console.log('listening on *:3000');
        });
    }
});