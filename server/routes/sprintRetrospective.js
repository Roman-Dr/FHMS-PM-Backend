var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var SprintRetrospective = mongoose.model('SprintRetrospective');
var Sprint = mongoose.model('Sprint');
var User = mongoose.model('User');

router.route('/projects/:project_id/sprints/:sprint_id/retrospective')
/**
 * @api {get} /projects/:project_id/sprints/:sprint_id/retrospective Get the retrospective for one sprint.
 * @apiName GetRetrospectiveBySprintId
 * @apiGroup Sprint
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 * @apiParam {ObjectId} sprint_id Unique identifier of a sprint.
 *
 * @apiSuccess {RetrospectiveItem[]} retrospectiveItems List of items.
 * @apiSuccess {ObjectId} retrospectiveItems._id Unique identifier of the retrospectiveItem.
 * @apiSuccess {ObjectId} retrospectiveItems.userId Unique identifier of the retrospectiveItem.
 * @apiSuccess {String} retrospectiveItems.userDisplayName DisplayName of the user.
 * @apiSuccess {String} retrospectiveItems.comment Comment of the user related to the sprint.
 */
    .get(function (req, res) {
        var sprintId = req.params.id;

        Sprint.findById(req.params.sprint_id, function (err, sprint) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            return res.json(sprint.retrospective);
        }).populate(['retrospective', 'retrospective.user']);
    })
    /**
     * @api {post} /projects/:project_id/sprints/:sprint_id/retrospective Create the retrospective for one sprint.
     * @apiName AddOrUpdateRetrospectiveBySprintId
     * @apiGroup Sprint
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} sprint_id Unique identifier of a sprint.
     *
     * @apiSuccess {RetrospectiveItem[]} retrospectiveItems List of items.
     * @apiSuccess {ObjectId} retrospectiveItems.userId Unique identifier of the retrospectiveItem.
     * @apiSuccess {String} retrospectiveItems.comment Comment of the user related to the sprint.
     */
    .post(function (req, res) {
        Sprint.findById(req.params.sprint_id, function (err, sprint) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            User.find({}, function (err, users) {
                console.log(JSON.stringify(users));
                sprint.retrospective.splice(0, sprint.retrospective.length);

                for (var i = 0; i < req.body.retrospective.length; i++) {
                    var item = req.body.retrospective[i];

                    var newRetrospective = new SprintRetrospective();
                    newRetrospective.userId = item.userId;
                    newRetrospective.comment = '';
                    newRetrospective.userDisplayName = users.filter(function (x) {
                        return x._id == item.userId
                    }).pop().displayName();
                    sprint.retrospective.push(newRetrospective);
                }

                sprint.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }

                    return res.json(sprint.retrospective);
                });
            });
        });
    });


router.route('/projects/:project_id/sprints/:sprint_id/retrospective/:retrospective_id')
    .put(function (req, res) {
        var sprintId = req.params.sprint_id;
        var retrospectiveId = req.params.retrospective_id;


        Sprint.findById(sprintId, function (err, sprint) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            var sprintRetrospective = sprint.retrospective.id(retrospectiveId);

            console.log('PUT: Update sprint retrospective for sprint id ' + sprintId);

            sprintRetrospective.comment = req.body.comment;

            sprint.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                } else {
                    console.log('Sprint Retrospective  ' + retrospectiveId + ' was updated.');
                    return res.json(200);
                }
            });
        });

    });


module.exports = router;