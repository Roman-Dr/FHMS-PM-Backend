var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var router = express.Router();

var BacklogItem = mongoose.model('BacklogItem');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var UserStory = mongoose.model('UserStory');

var BacklogItemValidator = require('./../validation/backlogItemValidator');

router.route('/projects/:project_id/backlogitems')

/**
 * @api {get} /projects/:project_id/backlogitems/ Get all backlogItems for one project.
 * @apiName GetBacklogItems
 * @apiGroup Backlog
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 *
 * @apiSuccess {BacklogItem[]} backlogitems List of backlogitems.
 * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
 * @apiSuccess {String} backlogitems.title The text of the backlogitem.
 * @apiSuccess {ObjectId} backlogitems.authorId Assigned author of the backlogitem
 * @apiSuccess {String} backlogitems.author Authorname of the backlogitem.
 * @apiSuccess {Date} backlogitems.creationDate CreationDate of the backlogitem.
 * @apiSuccess {ObjectId} backlogitems.assignedToId ID of assigned user.
 * @apiSuccess {String} backlogitems.assignedToDisplayName Name of assigned user.
 * @apiSuccess {Enum} backlogitems.state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
 * @apiSuccess {String} backlogitems.description Description of the backlogitem.
 * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
 * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
 * @apiSuccess {String} backlogitems.projectDisplayTitle Displaytitle for the assigned project.
 * @apiSuccess {Task[]} backlogitems.tasks List of tasks for the backlogitem.
 * @apiSuccess {Number} backlogitems.effort Effort in hours.
 * @apiSuccess {Number} backlogitems.priority Priority for backlogitem.
 * @apiSuccess {ObjectId} backllogitems.userStoryId ID of assigned userstory.
 * @apiSuccess {String} backlogitems.userStoryDisplayName Title of assigned userstory.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        BacklogItem.find({projectId: projectId}, function (err, backlogItems) {
            if (err) {
                return res.send(err);
            }
            return res.json(backlogItems);
        });
    })

    /**
     * @api {post} /projects/:project_id/backlogitems/ Create a new backlogitem.
     * @apiName AddBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {String} title The text of the backlogitem.
     * @apiParam {ObjectId} authorId Assigned author of the backlogitem
     * @apiParam {ObjectId} assignedToId ID of assigned user.
     * @apiParam {Enum} state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiParam {String} description Description of the backlogitem.
     * @apiParam {ObjectId} sprintId Assigned sprint of the backlogitem.
     * @apiParam {ObjectId} projectId Assigned project of the backlogitem.
     * @apiParam {Number} effort Effort in hours.
     * @apiParam {Number} priority Priority for backlogitem.
     * @apiParam {ObjectId} userStoryId ID of assigned userstory.
     *
     * @apiSuccess {ObjectId} _id Unique identifier of the backlogitem.
     * @apiSuccess {String} title The text of the backlogitem.
     * @apiSuccess {ObjectId} authorId Assigned author of the backlogitem
     * @apiSuccess {String} author Authorname of the backlogitem.
     * @apiSuccess {Date} creationDate CreationDate of the backlogitem.
     * @apiSuccess {ObjectId} assignedToId ID of assigned user.
     * @apiSuccess {String} assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiSuccess {String} description Description of the backlogitem.
     * @apiSuccess {ObjectId} sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} projectId Assigned project of the backlogitem.
     * @apiSuccess {String} projectDisplayTitle Displaytitle for the assigned project.
     * @apiSuccess {Task[]} tasks List of tasks for the backlogitem.
     * @apiSuccess {Number} effort Effort in hours.
     * @apiSuccess {Number} priority Priority for backlogitem.
     * @apiSuccess {ObjectId} userStoryId ID of assigned userstory.
     * @apiSuccess {String} userStoryDisplayName Title of assigned userstory.
     */
    .post(function (req, res) {

        var validator = new BacklogItemValidator();
        validator.validate(req, function (validationResult) {
            if (!validationResult.isValid()) {
                return res.status(460).send(validationResult.toResult());
            } else {
                var newBacklogItem = new BacklogItem();
                fillValues(req, newBacklogItem);
            }
        });
    });

router.route('/projects/:project_id/backlogitems/:id')

/**
 * @api {get} /projects/:project_id/backlogitems/:id Get existing backlogitem by ID.
 * @apiName GetBacklogItem
 * @apiGroup Backlog
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 * @apiParam {ObjectId} id Unique identifier of a backlogitem.
 *
 * @apiSuccess {ObjectId} _id Unique identifier of the backlogitem.
 * @apiSuccess {String} title The text of the backlogitem.
 * @apiSuccess {ObjectId} authorId Assigned author of the backlogitem
 * @apiSuccess {String} author Authorname of the backlogitem.
 * @apiSuccess {Date} creationDate CreationDate of the backlogitem.
 * @apiSuccess {ObjectId} assignedToId ID of assigned user.
 * @apiSuccess {String} assignedToDisplayName Name of assigned user.
 * @apiSuccess {Enum} state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
 * @apiSuccess {String} description Description of the backlogitem.
 * @apiSuccess {ObjectId} sprintId Assigned sprint of the backlogitem.
 * @apiSuccess {ObjectId} projectId Assigned project of the backlogitem.
 * @apiSuccess {String} projectDisplayTitle Displaytitle for the assigned project.
 * @apiSuccess {Task[]} tasks List of tasks for the backlogitem.
 * @apiSuccess {Number} effort Effort in hours.
 * @apiSuccess {Number} priority Priority for backlogitem.
 * @apiSuccess {ObjectId} userStoryId ID of assigned userstory.
 * @apiSuccess {String} userStoryDisplayName Title of assigned userstory.
 *
 */
    .get(function (req, res) {
        var id = req.params.id;
        var projectId = req.params.project_id;

        BacklogItem.findOne({_id: id, projectId: projectId}, function (err, backlogItem) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            if(!backlogItem) return res.status(404).send();

            return res.json(backlogItem);
        });
    })

    /**
     * @api {put} /projects/:project_id/backlogitems/:id Update an existing backlogitem.
     * @apiName UpdateBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} id Unique identifier of a backlogitem.
     * @apiParam {String} title The text of the backlogitem.
     * @apiParam {ObjectId} authorId Assigned author of the backlogitem
     * @apiParam {Date} timestamp Timestamp of the user story.
     * @apiParam {ObjectId} assignedToId ID of assigned user.
     * @apiParam {Enum} state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiParam {String} description Description of the backlogitem.
     * @apiParam {ObjectId} sprintId Assigned sprint of the backlogitem.
     * @apiParam {ObjectId} projectId Assigned project of the backlogitem.
     * @apiParam {Number} effort Effort in hours.
     * @apiParam {Number} priority Priority for backlogitem.
     * @apiParam {ObjectId} userStoryId ID of assigned userstory.
     *
     * @apiSuccess {ObjectId} _id Unique identifier of the backlogitem.
     * @apiSuccess {String} title The text of the backlogitem.
     * @apiSuccess {ObjectId} authorId Assigned author of the backlogitem
     * @apiSuccess {String} author Authorname of the backlogitem.
     * @apiSuccess {Date} creationDate CreationDate of the backlogitem.
     * @apiSuccess {ObjectId} assignedToId ID of assigned user.
     * @apiSuccess {String} assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiSuccess {String} description Description of the backlogitem.
     * @apiSuccess {ObjectId} sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} projectId Assigned project of the backlogitem.
     * @apiSuccess {String} projectDisplayTitle Displaytitle for the assigned project.
     * @apiSuccess {Task[]} tasks List of tasks for the backlogitem.
     * @apiSuccess {Number} effort Effort in hours.
     * @apiSuccess {Number} priority Priority for backlogitem.
     * @apiSuccess {ObjectId} userStoryId ID of assigned userstory.
     * @apiSuccess {String} userStoryDisplayName Title of assigned userstory.
     *
     */
    .put(function (req, res) {

        var validator = new BacklogItemValidator();
        validator.validate(req.body, function (validationResult) {
            if (!validationResult.isValid()) {
                return res.status(460).send(validationResult.toResult());
            } else {
                BacklogItem.findOne({_id: id, projectId: projectId}, function (err, newBacklogItem) {//TODO: Prüfen ob Projekt auch abgefragt werden muss.
                    if (err) {
                        return res.send(err);
                    }
                    fillValues(req, newBacklogItem);
                });
            }
        });
    })

    /**
     * @api {delete} /projects/:project_id/backlogitem/:id Delete an existing backlogitem.
     * @apiName DeleteBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} id Unique identifier of the backlogitem.
     *
     */
    .delete(function (req, res) {
        console.log("test")
        var id = req.params.id;

        BacklogItem.findByIdAndRemove(id,
            function (err, res) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
            });
        return res.json(200);
    });

function fillValues(req, newBacklogItem) {
    var projectId = req.params.project_id;
    var authorId = req.body.authorId;
    var assignedToId = req.body.assignedToId;
    var userStoryId = req.body.userStoryId;

    Project.findById(projectId, function (err, project) {
        if (err) {
            return res.send(err);
        }
        UserStory.findById(userStoryId, function (err, userStory) {
            if (err) {
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

                    newBacklogItem.assignedToId = assignedToId;
                    if (assignedTo == undefined) {
                        newBacklogItem.assignedToDisplayName = undefined;
                    } else {
                        newBacklogItem.assignedToDisplayName = assignedTo.displayName();
                    }

                    newBacklogItem.title = req.body.title;
                    newBacklogItem.authorId = authorId;
                    newBacklogItem.authorDisplayName = author.displayName();
                    newBacklogItem.creationDate = moment();

                    newBacklogItem.state = req.body.state;
                    newBacklogItem.description = req.body.description;
                    newBacklogItem.sprintId = req.body.sprintId;
                    newBacklogItem.projectId = projectId;
                    newBacklogItem.projectDisplayTitle = project.displayName;
                    newBacklogItem.priority = req.body.priority;
                    newBacklogItem.effort = req.body.effort;
                    newBacklogItem.userStoryId = userStoryId;
                    //newBacklogItem.userStoryDisplayName = userStory.title;

                    newBacklogItem.save(function (err) {
                        if (err) {
                            console.error(err);
                            return res.send(err);
                        }
                        return res.json(newBacklogItem);
                    });
                });
            });
        });
    });
}

module.exports = router;