var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var SprintCapacity = mongoose.model('SprintCapacity');
var Sprint = mongoose.model('Sprint');
var Project = mongoose.model('Project');

var SprintValidator = require('./../validation/sprintValidator');

router.route('/projects/:project_id/sprints')
/**
 * @api {get} /projects/:project_id/sprints Get all sprints.
 * @apiName GetSprints
 * @apiGroup Sprint
 *
 * @apiSuccess {Sprint[]} sprints List of sprints.
 * @apiSuccess {ObjectId} sprints._id User Sprints unique identifier.
 * @apiSuccess {String} sprints.sprintName The name of the sprint.
 * @apiSuccess {Date} sprints.startDate Start date of the sprint.
 * @apiSuccess {Date} sprints.endDate End date of the sprint.
 * @apiSuccess {ObjectId[]} sprints.sprintCapacity List of capacity of the team member.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        Sprint.find({projectId: projectId}, function (err, sprints) {
            if (err) {
                return res.send(err);
            }
            console.log('GET: Sprints for project id ' + projectId);
            return res.json(sprints);
        });
    })
    /**
     * @api {post} /projects/:project_id/sprints Create a new sprint.
     * @apiName AddSprint
     * @apiGroup Sprint
     *
     * @apiParam {String} sprintName The text of the sprint.
     * @apiParam {Date} sprints.startDate Start date of the sprint.
     * @apiParam {Date} sprints.endDate End date of the sprint.
     * @apiParam {ObjectId[]} [sprintCapacity} List of capacity of the team member.
     *
     * @apiSuccess {ObjectId} _id Sprint unique identifier.
     *
     */
    .post(function (req, res) {
        var projectId = req.params.project_id;

        var validator = new SprintValidator();
        var validationResult = validator.validate(req.body);
        if (!validationResult.isValid()) {
            return res.status(460).send(validationResult.toResult());
        }

        Project.findById(projectId, function (err, project) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            var newSprint = new Sprint();

            newSprint.sprintName = req.body.sprintName;
            newSprint.startDate = req.body.startDate;
            newSprint.endDate = req.body.endDate;
            newSprint.project_id = project_id;

            newSprint.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
                return res.json(newSprint);
            });
        });
    });

module.exports = router;