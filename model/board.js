//use strict;
var uuid = require('node-uuid');
var dbName = "TaskManager"; // "username:password@example.com/mydb"


var monk = require('monk');
var db = monk('localhost:27017/' + dbName);
var stories = db.get('stories');
stories.index('user', { unique: false });
stories.index('id', { unique: true });


var exports = module.exports;

exports.createStory = function (storyName, userName) {
    var id = uuid.v1();
    stories.insert({ name: storyName, user: userName, id: id, open: true});
    return id;
};
exports.loadStory = (function (id, callback) {
    stories.findOne({id: id, open: true}, function (err, item) {
        callback(item);
    });
});