var mongoose = require('mongoose');
var moment = require('moment');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');
var helper;


function BacklogItemValidator() {
    helper = new Validator();
}

BacklogItemValidator.prototype.validate = function(req, callback) {
    helper.isUserIdValid(req.body.authorId, function(userIsValid) {
        helper.isProjectIdValid(req.params.project_id, function(projectIsValid){
            helper.isUserStoryIdValid(req.params.project_id, req.body.userStoryId, function(userStoryIsValid){
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

                if(!req.body.title){
                    validationResult.add('title', 'Der Titel muss gesetzt sein.');
                }
                callback(validationResult);
            });
        });
    });
};

module.exports = BacklogItemValidator;