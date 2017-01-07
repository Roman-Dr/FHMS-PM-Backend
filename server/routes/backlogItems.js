var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var BacklogItem =  mongoose.model('BacklogItem');

router.route('/backlogitems')

    /**
     * @api {get} /backlogitems/ Get all backlogItems.
     * @apiName GetBacklogItems
     * @apiGroup Backlog
     *
     * @apiSuccess {BacklogItem[]} backlogitems List of backlogitems.
     * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
     * @apiSuccess {String} backlogitems.title The text of the backlogitem.
     * @apiSuccess {String} backlogitems.author Author of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedTo ID of assignes user.
     * @apiSuccess {Enum: New, Approved, Committed, Done, Removed} backlogitems.state State of the backlogitem.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
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
     * @apiParam {String} backlogitems.author Author of the backlogitem.
     * @apiParam {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiParam {ObjectId} backlogitems.assignedTo ID of assignes user.
     * @apiParam {Enum: New, Approved, Committed, Done, Removed} backlogitems.state State of the backlogitem.
     * @apiParam {String} backlogitems.description Description of the backlogitem.
     * @apiParam {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiParam {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     *
     * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
     * @apiSuccess {String} backlogitems.title The text of the backlogitem.
     * @apiSuccess {String} backlogitems.author Author of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedTo ID of assignes user.
     * @apiSuccess {Enum: New, Approved, Committed, Done, Removed} backlogitems.state State of the backlogitem.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     */
    .post(function (req, res) {
        var newBacklogItem = new BacklogItem();

        newBacklogItem.title = req.body.title;
        newBacklogItem.author = req.body.author;
        newBacklogItem.timestmp = req.body.timestmp;
        newBacklogItem.assignedTo = req.body.assignedTo;
        newBacklogItem.state = req.body.state;
        newBacklogItem.description = req.body.description;
        newBacklogItem.sprint = req.body.sprintId;
        newBacklogItem.project = req.body.projectId;

        newBacklogItem.save(function (err) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.json(newBacklogItem);
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
     * @apiSuccess {String} backlogitems.author Author of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedTo ID of assignes user.
     * @apiSuccess {Enum: New, Approved, Committed, Done, Removed} backlogitems.state State of the backlogitem.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
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
     * @apiParam {String} backlogitems.author Author of the backlogitem.
     * @apiParam {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiParam {ObjectId} backlogitems.assignedTo ID of assignes user.
     * @apiParam {Enum: New, Approved, Committed, Done, Removed} backlogitems.state State of the backlogitem.
     * @apiParam {String} backlogitems.description Description of the backlogitem.
     * @apiParam {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiParam {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     *
     * @apiSuccess {ObjectId} backlogitems._id Unique identifier of the backlogitem.
     * @apiSuccess {String} backlogitems.title The text of the backlogitem.
     * @apiSuccess {String} backlogitems.author Author of the backlogitem.
     * @apiSuccess {Date} backlogitems.timestamp Timestamp of the user story.
     * @apiSuccess {ObjectId} backlogitems.assignedTo ID of assignes user.
     * @apiSuccess {Enum: New, Approved, Committed, Done, Removed} backlogitems.state State of the backlogitem.
     * @apiSuccess {String} backlogitems.description Description of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.sprintId Assigned sprint of the backlogitem.
     * @apiSuccess {ObjectId} backlogitems.projectId Assigned project of the backlogitem.
     *
     */
    .put(function (req, res) {
        BacklogItem.findById(req.params.id,
            function (err, newBacklogItem) {
                if (err) {
                    console.error(err);

                    return res.status(404);
                }
                newBacklogItem.title = req.body.title;
                newBacklogItem.author = req.body.author;
                newBacklogItem.timestmp = req.body.timestmp;
                newBacklogItem.assignedTo = req.body.assignedTo;
                newBacklogItem.state = req.body.state;
                newBacklogItem.description = req.body.description;
                newBacklogItem.sprint = req.body.sprintId;
                newBacklogItem.project = req.body.projectId;

                newBacklogItem.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
                    return res.json({message: 'BacklogItem was updated!', data: newBacklogItem});
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