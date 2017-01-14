var mongoose = require('mongoose');
var moment = require('moment');

var Validator = require('./../validation/validatorHelper');
var ValidationResult = require('./../validation/validationResult');


function TaskValidator() {
    this.helper = new Validator();
}

TaskValidator.prototype.validate = function(task) {
    this.helper.isUserIdValid(task.body.authorId, function(userIsValid) {
        this.helper.isProjectIdValid(task.params.project_id, function(projectIsValid){
            this.helper.isBacklogItemIdValid(task.params.backlog_item_id, function(backlogItemIsValid){
                var validationResult = new ValidationResult();

                if(!userIsValid) {
                    validationResult.add('author', 'Die Id für den Autoren ist ungültig.');
                }

                if(!projectIsValid){
                    validationResult.add('project', 'Die ID des Projektes ist ungültig.');
                }

                if(!backlogItemIsValid){
                    validationResult.add('backlogItem', 'Die ID des BeacklogItems ist ungültig');
                }

                if(!task.title){
                    validationResult.add('title', 'Der Titel muss gesetzt sein.');
                }
                callback(validationResult);
            });
        });
    });
};

module.exports = TaskValidator;