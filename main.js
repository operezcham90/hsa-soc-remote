// database
const db = require('./db.js');
// http server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
// root route
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});
// log api route
app.get('/log', function (req, res) {
    db.log.get(function (rows) {
        res.json(rows);
    });
});
app.delete('/log', function (req, res) {
    const secret = req.body.secret;
    if (secret === process.env.SECRET) {
        db.log.delete(function (ok) {
            res.json(ok);
        });
    } else {
        res.json(false);
    }
});
app.post('/log', function (req, res) {
    const from = req.body.from;
    const message = req.body.message + ' [' + from + ']';
    const secret = req.body.secret;
    if (secret === process.env.SECRET) {
        db.log.post(message, function (ok) {
            res.json(ok);
        });
    } else {
        res.json(false);
    }
});
// start server
app.listen(process.env.PORT, function () {
    // migrations
    db.log.migrate();
});