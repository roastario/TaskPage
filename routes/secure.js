var express = require('express');
var router = express.Router();

var boards = require('../model/board');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.post('/api/stories/create', function(req, res) {
    var story = boards.createStory(req.body.storyName, req.user);
    res.send('created story:' + story);
});
// define the about route
router.get('/api/stories', function(req, res) {
    res.send('list stories');
});

router.get('/api/:story/boards', function(req, res){
    var storyId = req.param('story');
    res.send(storyId);
});

module.exports = router;