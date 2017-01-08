var mongoose = require('mongoose');

var UserStory = mongoose.model('UserStory');
var Project =  mongoose.model('Project');
var User =  mongoose.model('User');

// Constructor
function Validator() {
}

Validator.prototype.isUserIdValid = function(id) {
    User.findById(id, function (err, user) {
        if (err || user == undefined) {
            return false;
        }

        return true;
    });
};
Validator.prototype.isProjectIdValid = function(id) {
    Project.findById(id, function (err, user) {
        if (err || user == undefined) {
            return false;
        }

        return true;
    });
};

module.exports = Validator;