var mongoose = require('mongoose');
var moment = require('moment');

var UserStory =  mongoose.model('UserStory');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


// Constructor
function UserStoryValidator() {
    this.helper = new Validator();
}

UserStoryValidator.prototype.validate = function(userStory, callback) {
    var validationResult = new ValidationResult();

    this.helper.isUserIdValid(userStory.authorId, function(isUserValid){
        if(!isUserValid) {
            validationResult.add('authorId', 'Der Autor existiert nicht.');
        } else {
            if (!userStory.role) {
                validationResult.add('role', 'Die Rolle darf nicht leer sein.');
            }
            if (!userStory.feature) {
                validationResult.add('feature', 'Das/Der Ziel/Wunsch darf nicht leer sein.');
            }
            if (!userStory.benefit) {
                validationResult.add('benefit', 'Der Nutzen darf nicht leer sein.');
            }

            if (typeof userStory.complete != "boolean") {
                validationResult.add('complete', 'Der Status muss ein boolescher Wert sein.');
            }

            if (!userStory.authorId) {
                validationResult.add('authorId', 'Der Autor muss gesetzt werden.');
            }
        }
        callback(validationResult);
    });
};

module.exports = UserStoryValidator;
