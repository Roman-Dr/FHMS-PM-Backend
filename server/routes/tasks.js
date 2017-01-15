var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var router = express.Router();

var BacklogItem = mongoose.model('BacklogItem');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Task = mongoose.model('Task');

var TaskValidator = require('./../validation/taskValidator');

router.route('/projects/:project_id/backlogitems/:backlog_item_id/tasks')

    /**
     * @api {get} /projects/:project_id/backlogitems/:backlog_item_id/tasks Get all tasks for one backlogitem.
     * @apiName GetTasks
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectID} backlog_item_id Unique identifier of a backlogitem.
     *
     * @apiSuccess {Task[]} tasks List of tasks.
     * @apiSuccess {ObjectId} tasks._id Unique identifier of the task.
     * @apiSuccess {String} tasks.title The text of the task.
     * @apiSuccess {ObjectId} tasks.authorId Assigned author of the task
     * @apiSuccess {String} tasks.authorDisplayName Authorname of the task.
     * @apiSuccess {Date} tasks.creationDate Creationdate of the task.
     * @apiSuccess {ObjectId} tasks.assignedToId ID of assigned user.
     * @apiSuccess {String} tasks.assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} tasks.state State of the task. Values: 'New' 'Done' 'In Progress' 'Removed' 'To Do'.
     * @apiSuccess {Number} tasks.priority Priority of the task.
     * @apiSuccess {Number} tasks.effort Effort in hours.
     * @apiSuccess {String} tasks.description Description of the task.
     * @apiSuccess {ObjectId} tasks.projectId Assigned project of the task.
     * @apiSuccess {String} tasks.projectDisplayName Displayname for the assigned project.
     * @apiSuccess {ObjectId} tasks.backlogItemId Assigned backlogitem of the task.
     * @apiSuccess {String} tasks.backlogItemDisplayName Displayname for the assigned backlogitem.
     */
    .get(function (req, res) {
        var projectId = req.params.project_id;
        var backlogItemId = req.params.backlog_item_id;

        BacklogItem.findOne({_id: backlogItemId, projectId: projectId}, function (err, backlogItem) {
            if (err) {
                return res.send(err);
            }

            return res.json(backlogItem.tasks);
        });
    })
    /**
     * @api {post} /projects/:project_id/backlogitems/:backlog_item_id/tasks Create a new task.
     * @apiName AddTask
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectID} backlog_item_id Unique identifier of a backlogitem.
     * @apiParam {String} title The text of the task.
     * @apiParam {ObjectId} authorId Assigned author of the task
     * @apiParam {ObjectId} [assignedToId] ID of assigned user.
     * @apiParam {Enum} [state] State of the task. Values: 'New' 'Done' 'In Progress' 'Removed' 'To Do'.
     * @apiParam {Number} [priority] Priority of the task.
     * @apiParam {Number} [effort] Effort in hours.
     * @apiParam {String} [description] Description of the task.
     *
     * @apiSuccess {ObjectId} _id Unique identifier of the task.
     * @apiSuccess {String} title The text of the task.
     * @apiSuccess {ObjectId} authorId Assigned author of the task
     * @apiSuccess {String} authorDisplayName Authorname of the task.
     * @apiSuccess {Date} creationDate Creationdate of the task.
     * @apiSuccess {ObjectId} assignedToId ID of assigned user.
     * @apiSuccess {String} assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} state State of the task. Values: 'New' 'Done' 'In Progress' 'Removed' 'To Do'.
     * @apiSuccess {Number} priority Priority of the task.
     * @apiSuccess {Number} effort Effort in hours.
     * @apiSuccess {String} description Description of the task.
     * @apiSuccess {ObjectId} projectId Assigned project of the task.
     * @apiSuccess {String} projectDisplayName Displayname for the assigned project.
     * @apiSuccess {ObjectId} backlogItemId Assigned backlogitem of the task.
     * @apiSuccess {String} backlogItemDisplayName Displayname for the assigned backlogitem.
     */
    .post(function (req, res) {

        var validator = new TaskValidator();
        validator.validate(req, function (validationResult) {
            if (!validationResult.isValid()) {
                return res.status(460).send(validationResult.toResult());
            } else {
                fillValues(req, res, true);
            }
        });
    });

router.route('/projects/:project_id/backlogitems/:backlog_item_id/tasks/:id')

    /**
     * @api {get} /projects/:project_id/backlogitems/:backlog_item_id/tasks/:id Get one task for one backlogitem.
     * @apiName GetTask
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectID} backlog_item_id Unique identifier of a backlogitem.
     * @apiParam {ObjectID} id Unique identifier of a task.
     *
     * @apiSuccess {ObjectId} _id Unique identifier of the task.
     * @apiSuccess {String} title The text of the task.
     * @apiSuccess {ObjectId} authorId Assigned author of the task
     * @apiSuccess {String} authorDisplayName Authorname of the task.
     * @apiSuccess {Date} creationDate Creationdate of the task.
     * @apiSuccess {ObjectId} assignedToId ID of assigned user.
     * @apiSuccess {String} assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} state State of the task. Values: 'New' 'Done' 'In Progress' 'Removed' 'To Do'.
     * @apiSuccess {Number} priority Priority of the task.
     * @apiSuccess {Number} effort Effort in hours.
     * @apiSuccess {String} description Description of the task.
     * @apiSuccess {ObjectId} projectId Assigned project of the task.
     * @apiSuccess {String} projectDisplayName Displayname for the assigned project.
     * @apiSuccess {ObjectId} backlogItemId Assigned backlogitem of the task.
     * @apiSuccess {String} backlogItemDisplayName Displayname for the assigned backlogitem.
     */
    .get(function (req, res) {
        var projectId = req.params.project_id;
        var backlogItemId = req.params.backlog_item_id;
        var taskId = req.params.id;

        BacklogItem.findOne({_id: backlogItemId, projectId: projectId}, function (err, backlogItem) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.json(backlogItem.tasks.id(taskId));
        });
    })

    /**
     * @api {put} /projects/:project_id/backlogitems/:backlog_item_id/tasks/:id Update a task.
     * @apiName UpdateTask
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectID} backlog_item_id Unique identifier of a backlogitem.
     * @apiParam {ObjectId} id Unique identifier of a task.
     * @apiParam {String} title The text of the task.
     * @apiParam {ObjectId} authorId Assigned author of the task
     * @apiParam {ObjectId} [assignedToId] ID of assigned user.
     * @apiParam {Enum} [state] State of the task. Values: 'New' 'Done' 'In Progress' 'Removed' 'To Do'.
     * @apiParam {Number} [priority] Priority of the task.
     * @apiParam {Number} [effort] Effort in hours.
     * @apiParam {String} [description] Description of the task.
     *
     * @apiSuccess {ObjectId} _id Unique identifier of the task.
     * @apiSuccess {String} title The text of the task.
     * @apiSuccess {ObjectId} authorId Assigned author of the task
     * @apiSuccess {String} authorDisplayName Authorname of the task.
     * @apiSuccess {Date} creationDate Creationdate of the task.
     * @apiSuccess {ObjectId} assignedToId ID of assigned user.
     * @apiSuccess {String} assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} state State of the task. Values: 'New' 'Done' 'In Progress' 'Removed' 'To Do'.
     * @apiSuccess {Number} priority Priority of the task.
     * @apiSuccess {Number} effort Effort in hours.
     * @apiSuccess {String} description Description of the task.
     * @apiSuccess {ObjectId} projectId Assigned project of the task.
     * @apiSuccess {String} projectDisplayName Displayname for the assigned project.
     * @apiSuccess {ObjectId} backlogItemId Assigned backlogitem of the task.
     * @apiSuccess {String} backlogItemDisplayName Displayname for the assigned backlogitem.
     */
    .put(function (req, res) {
        var validator = new TaskValidator();
        validator.validate(req, function (validationResult) {
            if (!validationResult.isValid()) {
                return res.status(460).send(validationResult.toResult());
            } else {
                fillValues(req, res, false);
            }
        });
    })

    /**
     * @api {delete} /projects/:project_id/backlogitem/:id Delete an existing backlogitem.
     * @apiName DeleteBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} backlogitems.project_id Unique identifier of a project.
     * @apiParam {ObjectId} backlogitems.id Unique identifier of the backlogitem.
     *
     */
    .delete(function (req, res) {
        var backlogItemId = req.params.backlog_item_id;
        var taskId = req.params.id;

        BacklogItem.findById(backlogItemId, function (err, backlogItem) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            var task = backlogItem.tasks.id(taskId);

            if (task != undefined) {
                task.remove();
            }

            backlogItem.save(function (err) {
                if(err){
                    console.error(err);
                    return res.send(err);
                }else {
                    return res.status(200).json("Success!");
                }
            });
        });
    });

function fillValues(req, res, created) {
    var projectId = req.params.project_id;
    var backlogItemId = req.params.backlog_item_id;
    var authorId = req.body.authorId;
    var assignedToId = req.body.assignedToId;


    BacklogItem.findOne({_id: backlogItemId, projectId: projectId}, function (err, backlogItem) {
        if(err){
            return res.send(err);
        }
        User.findById(authorId, function (err, author) {
            if (err) {
                return res.send(err);
            }
            User.findById(assignedToId, function (err, assignedTo) {
                if (err) {
                    return res.send(err);
                }

                var newTask = new Task();
                if(!created){
                    newTask = backlogItem.tasks.id(req.params.id);
                }

                newTask.assignedToId = assignedToId;
                if (assignedTo == undefined) {
                    newTask.assignedToDisplayName = undefined;
                } else {
                    newTask.assignedToDisplayName = assignedTo.displayName();
                }

                newTask.title = req.body.title;
                newTask.authorId = authorId;
                newTask.authorDisplayName = author.displayName();
                newTask.creationDate = moment();

                newTask.state = req.body.state;
                newTask.description = req.body.description;
                newTask.sprintId = req.body.sprintId;
                newTask.projectId = projectId;
                newTask.projectDisplayName = backlogItem.projectDisplayTitle;
                newTask.backlogItemId = backlogItemId;
                newTask.backlogItemDisplayName = backlogItem.title;
                newTask.priority = req.body.priority;
                newTask.effort = req.body.effort;

                if(created) {
                    backlogItem.tasks.push(newTask);
                }
                backlogItem.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
                    return res.json(newTask);
                });

            });
        });

    });
}

module.exports = router;