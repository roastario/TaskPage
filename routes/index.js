var express = require('express');
var router = express.Router();

/* GET home page. */
var renderIndex = function (req, res) {
    res.render('index', { title: 'Express' });
};

router.get('/', renderIndex);

module.exports = router;
