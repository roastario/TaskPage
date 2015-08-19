var express = require('express');
var router = express.Router();

var users = require('../model/users');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/new', function (req, res) {
    var userOptions = req.body;
    users.createUser(userOptions.username, userOptions.useremail);
    res.send('OK');
});

router.get('/create', function (req, res) {
    res.render('create', {});
});

router.get('/login', function(req, res){
    res.render('login', {});
})

router.post('/login', function (req, res) {
    var username = req.body.username;
    users.loadUser(username, function (user) {
        if (user) {
            req.session.userId = username;
            res.status=200;
            res.send('Logged in');
        } else {
            res.status = 401;
            res.send('Failed');
        }
    })
});

module.exports = router;
