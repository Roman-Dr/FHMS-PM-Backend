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
            if (!userStory.title) {
                validationResult.add('title', 'Der Titel darf nicht leer sein.');
            }

            if (!userStory.complete) {
                validationResult.add('complete', 'Der Status muss gesetzt werden.');
            } else {
                if (userStory.complete != "true" && userStory.complete != "false") {
                    validationResult.add('complete', 'Der Status muss ein boolescher Wert sein.');
                }
            }

            if (!userStory.authorId) {
                validationResult.add('authorId', 'Der Autor muss gesetzt werden.');
            }
        }
        callback(validationResult);
    });
};

module.exports = UserStoryValidator;
