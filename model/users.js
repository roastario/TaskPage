/**
 * Created by stefano on 26/07/2015.
 */
// app.js
var dbName = "TaskManager"; // "username:password@example.com/mydb"
var collections = ["users"];

var monk = require('monk');
var db = monk('localhost:27017/' + dbName);
var users = db.get('users');
users.index('name', { unique: true }); // unique

var exports = module.exports;

exports.createUser = function (user, password) {
    users.insert({ name: user, bigdata: {password: password} });
};
exports.loadUser = (function (user, callback) {
    users.findOne({name: user}, function (err, item) {
        console.log(user);
        callback(item);
    });
});