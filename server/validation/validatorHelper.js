var mongoose = require('mongoose');

var Project = mongoose.model('Project');
var User = mongoose.model('User');
var BacklogItem = mongoose.model('BacklogItem');

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
Validator.prototype.isUserStoryIdValid = function (project_id, id, callback) {
    Project.findById(project_id, function (err, project) {
        if (err || project == undefined) {
            callback(false);
        }
        else {
            var userStory = project.userStories.id(id);
            if(err || userStory == undefined){
                callback(false);
            } else {
                callback(true);
            }
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