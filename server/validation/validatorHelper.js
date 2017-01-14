var mongoose = require('mongoose');

var UserStory = mongoose.model('UserStory');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

// Constructor
function Validator() {
}

Validator.prototype.isUserIdValid = function (id, callback) {
    User.findById(id, function (err, user) {
        if (err || user == undefined) {
            callback(false);
        } else {
            callback(true);
        }
    });
};
Validator.prototype.isProjectIdValid = function (id, callback) {
    Project.findById(id, function (err, user) {
        if (err || user == undefined) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
};
Validator.prototype.isUserStoryIdValid = function (id, callback) {
    UserStory.findById(id, function (err, user) {
        if (err || user == undefined) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
};
Validator.prototype.isBacklogItemIdValid = function (id, callback) {
    BacklogItem.findById(id, function (err, user) {
        if (err || user == undefined) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
};

module.exports = Validator;