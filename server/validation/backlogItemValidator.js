var mongoose = require('mongoose');
var moment = require('moment');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


function BacklogItemValidator() {
    this.helper = new Validator();
}

BacklogItemValidator.prototype.validate = function(backlogItem) {
    this.helper.isUserIdValid(backlogItem.body.authorId, function(userIsValid) {
        this.helper.isProjectIdValid(backlogItem.params.project_id, function(projectIsValid){
            this.helper.isUserStoryIdValid(backlogItem.body.userStoryId, function(userStoryIsValid){
                var validationResult = new ValidationResult();

                if(!userIsValid) {
                    validationResult.add('author', 'Die Id für den Autoren ist ungültig.');
                }

                if(!projectIsValid){
                    validationResult.add('project', 'Die ID des Projektes ist ungültig.');
                }

                if(!userStoryIsValid){
                    validationResult.add('userStory', 'Die ID der UserStory ist ungültig.');
                }

                if(!backlogItem.title){
                    validationResult.add('title', 'Der Titel muss gesetzt sein.');
                }
                callback(validationResult);
            });
        });
    });
};

module.exports = BacklogItemValidator;