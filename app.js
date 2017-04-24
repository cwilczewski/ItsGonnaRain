// Include our libraries
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var SerialPort = require("serialport");
var bodyParser = require('body-parser');
var router = express();
var inarray = require('inarray');
var methodOverride = require('method-override');
router.use(methodOverride('_method'));
var server = http.createServer(router);
var io = socketio.listen(server);
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
// Use router to point requests to the 'files' folder
router.use(express.static(path.resolve(__dirname, 'client')));

// Socket.io function that runs when a user connects
var data;
var port = new SerialPort('\\\\.\\COM3', {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\n')
});
// Connection URL 
var url = 'mongodb://localhost:27017/weather';
// Use connect method to connect to the Server 
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        router.locals.db = db;

    }
});
port.on('open', function () {
    port.write('ey fam, we connected', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('Connected');
    });
});
// open errors will be emitted as an error event 
port.on('error', function (err) {
    console.log('Error: ', err.message);
});
io.on('connection', function (socket) {
    console.log('a user connected');
    router.locals.db.collection('weather', function (err, collection) {
        collection.find().sort({
            _id: 1
        }).limit(5).toArray(function (err, newestData) {
            socket.emit('newestData', newestData);
//            console.log(newestData);
        });
    });

            

    port.on('data', function (data) {
        console.log('Data: ' + data);
        var data = data;
        data = JSON.parse(data);
        socket.emit('data', data);
        //save to mongo
        router.locals.db.collection('weather', function (err, collection) {
            if (data.temp == 'nan') {
                console.log('skipping');
            } else {
                collection.insert(data, function (err, result) {
                    console.log('Inserted');
                });
            }
        });
        //        main page info from mongo
        router.locals.db.collection('weather', function (err, collection) {
            collection.find().sort({
                _id: 1
            }).limit(5).toArray(function (err, newestData) {
                socket.emit('newestData', newestData);
//                console.log(newestData);
            });
        });
        //temp chart info from mongo, latest 5 entries


        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
});
// Start our server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port);
});