var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
// var cors         = require('cors');
var dbConfig = require('./config/database.config.json');
var mongoService = require('./db/mongo.service');

var connectionString = "mongodb://" + dbConfig.mongodb.host + ":" + dbConfig.mongodb.port + "/" + dbConfig.mongodb.dbname;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var list_user = [];
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var socket = io.of('/chat')
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

app.use(session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ url: 'mongodb://localhost:27017/bkfood' })
}));
// app.use(session({ secret: 'n2qv1994', 
//                   cookie: { maxAge: 60000 },
//                   resave: true, 
//                   saveUninitialized: true, 
//                   store: new MongoStore({ url: 'mongodb://localhost:27017/test' }) 
//                   }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

mongoService.connect(connectionString, function(err) {
    console.log('connection string:\n' + connectionString);
    if (err) {
        console.log('Unable to connect Mongo DB');
        process.exit(1);
    } else {
        app.use('/api', require('./api/api'));
        io.on('connection', function(socket) {
            var user = {};
            user.username = socket.handshake.query.username;
            user.socket_id = socket.id;
            list_user.push(user);
            console.log(list_user);
            socket.on('order', function(data) {
                console.log(data);
                for (var i = 0; i < list_user.length; i++) {
                    if (data.to === list_user[i].username) {
                        user_recever = list_user[i];
                        console.log("aaa1: " + list_user[i].username);
                        console.log("aaa1: " + list_user[i].socket_id);
                        socket.to(list_user[i].socket_id).emit('order', data);
                        return; 
                    }
                };
            });
        });
        server.listen(app.get('port'), function() {
            console.log('listening on *:3000');
        });
    }
});