var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var SprintCapacity = mongoose.model('SprintCapacity');
var Sprint = mongoose.model('Sprint');
var Project = mongoose.model('Project');

var SprintValidator = require('./../validation/sprintValidator');
var SprintCapacityValidator = require('./../validation/sprintCapacityValidator');

router.route('/projects/:project_id/sprints')
/**
 * @api {get} /projects/:project_id/sprints Get all sprints.
 * @apiName GetSprints
 * @apiGroup Sprint
 *
 * @apiSuccess {Sprint[]} sprints List of sprints.
 * @apiSuccess {ObjectId} sprints._id Sprints unique identifier.
 * @apiSuccess {String} sprints.sprintName The name of the sprint.
 * @apiSuccess {Date} sprints.startDate Start date of the sprint.
 * @apiSuccess {Date} sprints.endDate End date of the sprint.
 * @apiSuccess {ObjectId} sprints.projectId ProjectId of the sprint.
 * @apiSuccess {ObjectId[]} sprints.sprintCapacity List of capacity of the team member.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        Sprint.find({projectId: projectId}, function (err, sprints) {
            if (err) {
                console.error(err);
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
     * @apiParam {Date} startDate Start date of the sprint.
     * @apiParam {Date} endDate End date of the sprint.
     *
     * @apiSuccess {ObjectId} _id Sprint unique identifier.
     */
    .post(function (req, res) {
        var projectId = req.params.project_id;

        var validator = new SprintValidator();
        validator.validate(req.body, function (validationResult) {
            if (!validationResult.isValid()) {
                return res.status(460).send(validationResult.toResult());
            } else {
                Project.findById(projectId, function (err, project) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
                    var newSprint = new Sprint();
                    newSprint.sprintName = req.body.sprintName;
                    newSprint.startDate = req.body.startDate;
                    newSprint.endDate = req.body.endDate;
                    // sprintCapacity ergänzen
                    newSprint.projectId = projectId;

                    newSprint.save(function (err) {
                        if (err) {
                            console.error(err);
                            return res.send(err);
                        }
                        return res.json(newSprint._id);
                    });
                });
            }
        });
    });

router.route('/projects/:project_id/sprints/:id')
/**
 * @api {get} /projects/:project_id/sprints/:id Retrieve an existing sprint by id.
 * @apiName GetSprint
 * @apiGroup Sprint
 *
 * @apiParam {ObjectId} _id Sprints unique identifier.
 *
 * @apiSuccess {ObjectId} _id Sprints unique identifier.
 * @apiSuccess {String} sprintName The name of the sprint.
 * @apiSuccess {Date} startDate Start date of the sprint.
 * @apiSuccess {Date} endDate End date of the sprint.
 * @apiSuccess {ObjectId} projectId ProjectId of the sprint.
 * @apiSuccess {ObjectId[]} sprintCapacity List of capacity of the team member.
 *
 */
    .get(function (req, res) {
        var sprintId = req.params.id;

        Sprint.findById(sprintId, function (err, item) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            console.log('GET: Sprint with id ' + sprintId);
            return res.json(item);
        });
    })

    /**
     * @api {put} /projects/:project_id/sprints/:id Update an existing sprint.
     * @apiName UpdateSprint
     * @apiGroup Sprint
     *
     * @apiParam {ObjectId} _id Sprints unique identifier.
     * @apiParam {String} sprintName The text of the sprint.
     * @apiParam {Date} startDate Start date of the sprint.
     * @apiParam {Date} endDate End date of the sprint.
     *
     */
    .put(function (req, res) {
        var projectId = req.params.project_id;
        var sprintId = req.params.id;

        var validator = new SprintValidator();
        validator.validate(req.body, function (validationResult) {
            if (!validationResult.isValid()) {
                return res.status(460).send(validationResult.toResult());
            } else {
                Sprint.findById(sprintId, function (err, sprint) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
                    console.log('PUT: Update Sprint for project id ' + projectId);
                    sprint.sprintName = req.body.sprintName;
                    sprint.startDate = req.body.startDate;
                    sprint.endDate = req.body.endDate;

                    sprint.save(function (err) {
                        if (err) {
                            console.error(err);
                            return res.send(err);
                        }
                        console.log('Sprint ' + sprintId + ' updated.');
                        return res.json(200);
                    });
                });
            }
        });
    })

    /**
     * @api {delete} /projects/:project_id/sprints/:id Delete an existing sprint.
     * @apiName DeleteSprint
     * @apiGroup Sprint
     *
     * @apiParam {ObjectId} _id Sprints unique identifier.
     *
     */
    .delete(function (req, res) {
        var sprintId = req.params.id;

        Sprint.findByIdAndRemove(sprintId, function (err, res) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
        });
        return res.status(200).send();
    });


router.route('/projects/:project_id/sprints/:sprint_id/sprintcapacities')
/**
 * @api {get} /projects/:project_id/sprints/:sprint_id/sprintcapacities Get all sprint capacities.
 * @apiName GetSprintCapacity
 * @apiGroup SprintCapacity
 *
 * @apiSuccess {ObjectId} _id Sprints unique identifier.
 * @apiSuccess {String} sprintName The name of the sprint.
 * @apiSuccess {Date} startDate Start date of the sprint.
 * @apiSuccess {Date} endDate End date of the sprint.
 * @apiSuccess {ObjectId} projectId ProjectId of the sprint.
 * @apiSuccess {SprintCapacity[]} sprintcapacities List of sprint capacities of one sprint.
 * @apiSuccess {ObjectId} sprintcapacities._id Sprint capacities unique identifier.
 * @apiSuccess {ObjectId} sprintcapacities.userId userId of the user that in the sprint team.
 * @apiSuccess {ObjectId} sprintcapacities.sprintId sprintId of corresponding sprint.
 * @apiSuccess {Number} sprintcapacities.daysOff Number off Day offs.
 * @apiSuccess {Number} sprintcapacities.capacityPerDay Number of how many hours this person work on the sprint.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;
        var sprintId = req.params.sprint_id;
        var sprintCapacityId = req.params.id;


        Sprint.find({'sprintCapacity.sprintId': sprintId}, function (err, item) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            console.log('GET: SprintCapacities for sprint ' + sprintId);
            return res.json(item);

        });
    })
    /**
     * @api {post} /projects/:project_id/sprints/:sprint_id/sprintcapacities Create a new sprint capacity.
     * @apiName AddSprintCapacity
     * @apiGroup SprintCapacity
     *
     * @apiParam {ObjectId} userId userId of the user that in the sprint team.
     * @apiParam {Number} daysOff Number off Day offs.
     * @apiParam {Number} daysOff Number off Day offs.
     * @apiParam {Number} capacityPerDay Number of how many hours this person work on the sprint.
     *
     * @apiSuccess {ObjectId} _id User stories unique identifier.
     *
     */
    .post(function (req, res) {
        var projectId = req.params.project_id;
        var sprintId = req.params.sprint_id;
        var sprintCapacityId = req.params.id;

        var validator = new SprintCapacityValidator();
        validator.validate(req.body, function (validationResult) {
            if (!validationResult.isValid()) {
                return res.status(460).send(validationResult.toResult());
            } else {

                Sprint.findById(sprintId, function (err, sprint) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
                    console.log('POST: Create new sprint capacity for sprint id ' + sprintId);

                    var newSprintCapacity = new SprintCapacity();

                    newSprintCapacity.userId = req.body.userId;
                    newSprintCapacity.sprintId = sprintId;
                    newSprintCapacity.daysOff = req.body.daysOff;
                    newSprintCapacity.capacityPerDay = req.body.capacityPerDay;

                    sprint.sprintCapacity.push(newSprintCapacity);

                    sprint.save(function (err) {
                        if (err) {
                            console.error(err);
                            return res.send(err);
                        } else {
                            console.log('New sprint capacity in sprint ' + sprintId + ' created.');
                            return res.json(newSprintCapacity._id);
                        }
                    });
                });
            }
        });
    });


router.route('/projects/:project_id/sprints/:sprint_id/sprintcapacities/:id')
/**
 * @api {get} /projects/:project_id/sprints/:sprint_id/sprintcapacities/:id Retrieve an existing sprint capacity by her id.
 * @apiName GetSprintCapacity
 * @apiGroup SprintCapacity
 *
 * @apiParam {ObjectId} _id Sprint capacities unique identifier.
 *
 * @apiSuccess {ObjectId} _id Sprint capacities unique identifier.
 * @apiSuccess {ObjectId} authorId userId of the user that in the sprint team.
 * @apiSuccess {ObjectId} sprintId sprintId of corresponding sprint.
 * @apiSuccess {Number} daysOff Number off Day offs.
 * @apiSuccess {Number} capacityPerDay Number of how many hours this person work on the sprint.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;
        var sprintId = req.params.sprint_id;
        var sprintCapacityId = req.params.id;

        Sprint.find({'sprintCapacity._id': sprintCapacityId}, 'sprintCapacity.$', function (err, sprintcapacity) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            console.log('Get SprintCapacity ' + sprintCapacityId + ' from Sprint ' + sprintId);
            return res.json(sprintcapacity);
        });
    })

    /**
     * @api {put} /projects/:project_id/sprints/:sprint_id/sprintcapacities/:id Update an existing sprint capacity.
     * @apiName UpdateSprintCapacity
     * @apiGroup SprintCapacity
     *
     * @apiParam {ObjectId} _id User stories unique identifier.
     * @apiParam {String} title The text of the user story.
     * @apiParam {ObjectId} authorId Author´s identifier of the user story.
     * @apiParam {Boolean} complete State of the user story.
     *
     */
    .put(function (req, res) {
        var projectId = req.params.project_id;
        var sprintId = req.params.sprint_id;
        var sprintCapacityId = req.params.id;

        var validator = new SprintCapacityValidator();
        validator.validate(req.body, function (validationResult) {
                if (!validationResult.isValid()) {
                    return res.status(460).send(validationResult.toResult());
                } else {

                    Sprint.findById(sprintId, function (err, item) {
                        if (err) {
                            console.error(err);
                            return res.send(err);
                        }

                        var sprintCapacity = item.sprintCapacity.id(sprintCapacityId);

                        console.log('PUT: Update sprint capacity for sprint id ' + sprintId);

                        sprintCapacity.userId = req.body.userId;
                        sprintCapacity.daysOff = req.body.daysOff;
                        sprintCapacity.capacityPerDay = req.body.capacityPerDay;

                        item.save(function (err) {
                            if (err) {
                                console.error(err);
                                return res.send(err);
                            } else {
                                console.log('Sprint Capacity ' + sprintCapacityId + ' was updated.');
                                return res.json(200);
                            }
                        });
                    });
                }
            }
        );
    })

    /**
     * @api {delete} /projects/:project_id/sprints/:sprint_id/sprintcapacities/:id Delete an existing sprint capacity.
     * @apiName DeleteSprintCapacity
     * @apiGroup SprintCapacity
     *
     * @apiParam {ObjectId} _id Sprint capacity unique identifier.
     *
     */
    .delete(function (req, res) {
        var projectId = req.params.project_id;
        var sprintId = req.params.sprint_id;
        var sprintCapacityId = req.params.id;

        Sprint.findById(sprintId, function (err, item) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            var sprintCapacity = item.sprintCapacity.id(sprintCapacityId);

            if (sprintCapacity != undefined) {
                sprintCapacity.remove();
            }
            item.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                } else {
                    return res.json(200);
                }
            });
        });
    });


module.exports = router;