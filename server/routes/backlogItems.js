var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var BacklogItem =  mongoose.model('BacklogItem');
var User =  mongoose.model('User');
var Project = mongoose.model('Project');

router.route('/backlogitems')

    /**
     * @api {get} /backlogitems/ Get all backlogItems.
     * @apiName GetBacklogItems
     * @apiGroup Backlog
     *
     * @apiSuccess {BacklogItem[]} backlogitems List of backlogitems.
     * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
     * @apiSuccess {String} backlogitems.title The text of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.authorId Assigned author of the backlogitem
     * @apiSuccess {String} backlogitems.author Authorname of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedToId ID of assigned user.
     * @apiSuccess {String} backlogitems.assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} backlogitems.state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     * @apiSuccess {String} backlogitems.projectDisplayTitle Displaytitle for the assigned project.
     */
    .get(function (req, res) {
        BacklogItem.find(function (err, backlogItems) {
            if (err) {
                return res.send(err);
            }
            return res.json(backlogItems);
        });
    })
    /**
     * @api {post} /backlogitems/ Create a new backlogitem.
     * @apiName AddBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {String} backlogitems.title The text of the backlogitem.
     * @apiParam {ObjectId} backlogitems.authorId Assigned author of the backlogitem
     * @apiParam {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiParam {ObjectId} backlogitems.assignedToId ID of assigned user.
     * @apiParam {Enum} backlogitems.state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiParam {String} backlogitems.description Description of the backlogitem.
     * @apiParam {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiParam {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     *
     * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
     * @apiSuccess {String} backlogitems.title The text of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.authorId Assigned author of the backlogitem
     * @apiSuccess {String} backlogitems.author Authorname of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedToId ID of assigned user.
     * @apiSuccess {String} backlogitems.assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} backlogitems.state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     * @apiSuccess {String} backlogitems.projectDisplayTitle Displaytitle for the assigned project.
     */
    .post(function (req, res) {
        var projectId = req.body.projectId;
        var authorId = req.body.authorId;
        var assignedToId = req.body.assignedToId;

        Project.findById(projectId, function(err, project){
            if (err) {
                return res.send(err);
            }
            User.findById(authorId, function(err, author){
                if (err){
                    return res.send(err);
                }
                User.findById(assignedToId, function(err, assignedTo){
                   if (err){
                       return res.send(err);
                   }

                    var newBacklogItem = new BacklogItem();

                    newBacklogItem.title = req.body.title;
                    newBacklogItem.authorId = authorId;
                    newBacklogItem.authorDisplayName = author.displayName();
                    newBacklogItem.timestmp = req.body.timestmp;
                    newBacklogItem.assignedToId = assignedToId;
                    if(assignedTo == undefined) {
                        newBacklogItem.assignedToDisplayName = undefined;
                    } else {
                        newBacklogItem.assignedToDisplayName = assignedTo.displayName();
                    }
                    newBacklogItem.state = req.body.state;
                    newBacklogItem.description = req.body.description;
                    newBacklogItem.sprintId = req.body.sprintId;
                    newBacklogItem.projectId = projectId;
                    newBacklogItem.projectDisplayTitle = project.displayName;

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

router.route('/backlogitem/:id')

    /**
     * @api {get} /backlogitems/:id Get existing backlogitem by ID.
     * @apiName GetBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} _id Unique identifier of a backlogitem.
     *
     * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
     * @apiSuccess {String} backlogitems.title The text of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.authorId Assigned author of the backlogitem
     * @apiSuccess {String} backlogitems.author Authorname of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedToId ID of assigned user.
     * @apiSuccess {String} backlogitems.assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} backlogitems.state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     * @apiSuccess {String} backlogitems.projectDisplayTitle Displaytitle for the assigned project.
     *
     */
    .get(function (req, res) {
        BacklogItem.findById(req.params.id, function (err, backlogItem) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.json(backlogItem);
        });
    })

    /**
     * @api {put} /backlogitems/:id Update an existing backlogitem.
     * @apiName UpdateBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {String} backlogitems.title The text of the backlogitem.
     * @apiParam {ObjectId} backlogitems.authorId Assigned author of the backlogitem
     * @apiParam {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiParam {ObjectId} backlogitems.assignedToId ID of assigned user.
     * @apiParam {Enum} backlogitems.state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiParam {String} backlogitems.description Description of the backlogitem.
     * @apiParam {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiParam {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     *
     * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
     * @apiSuccess {String} backlogitems.title The text of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.authorId Assigned author of the backlogitem
     * @apiSuccess {String} backlogitems.author Authorname of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedToId ID of assigned user.
     * @apiSuccess {String} backlogitems.assignedToDisplayName Name of assigned user.
     * @apiSuccess {Enum} backlogitems.state State of the backlogitem. Values: 'New' 'Approved' 'Committed' 'Done' 'Removed'.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     * @apiSuccess {String} backlogitems.projectDisplayTitle Displaytitle for the assigned project.
     *
     */
    .put(function (req, res) {
        BacklogItem.findById(req.params.id,
            function (err, newBacklogItem) {
                if (err) {
                    console.error(err);

                    return res.status(404);
                }
                var projectId = req.body.projectId;
                var authorId = req.body.authorId;
                var assignedToId = req.body.assignedToId;

                Project.findById(projectId, function(err, project){
                    if (err) {
                        return res.send(err);
                    }
                    User.findById(authorId, function(err, author){
                        if (err){
                            return res.send(err);
                        }
                        User.findById(assignedToId, function(err, assignedTo){
                            if (err){
                                return res.send(err);
                            }

                            newBacklogItem.title = req.body.title;
                            newBacklogItem.authorId = authorId;
                            newBacklogItem.authorDisplayName = author.displayName();
                            newBacklogItem.timestmp = req.body.timestmp;
                            newBacklogItem.assignedToId = assignedToId;
                            if(assignedTo == undefined) {
                                newBacklogItem.assignedToDisplayName = undefined;
                            } else {
                                newBacklogItem.assignedToDisplayName = assignedTo.displayName();
                            }
                            newBacklogItem.state = req.body.state;
                            newBacklogItem.description = req.body.description;
                            newBacklogItem.sprintId = req.body.sprintId;
                            newBacklogItem.projectId = projectId;
                            newBacklogItem.projectDisplayTitle = project.displayName;

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
    })

    /**
     * @api {delete} /backlogitem/:id Delete an existing backlogitem.
     * @apiName DeleteBacklogItem
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} _id Unique identifier of the backlogitem.
     *
     */
    .delete(function (req, res) {
        BacklogItem.findByIdAndRemove(req.params.id,
            function (err, res) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
            });
        return res.status(200);
    });

module.exports = router;