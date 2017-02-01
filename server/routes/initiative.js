var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Roadmap = mongoose.model('Roadmap');
var Initiative = mongoose.model('Initiative');
var Project = mongoose.model('Project');
var Feature = mongoose.model('Feature');


router.route('/projects/:project_id/roadmaps/:roadmap_id/initiatives')

/**
 * @api {get} /projects/:project_id/roadmaps/:roadmap_id/initiatives Get all initiatives for one roadmap.
 * @apiName GetInitiatives
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 *
 * @apiSuccess {Initiative[]} initiatives List of initiatives.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }
            return res.json(roadmap.initiatives);

        });
    })

    /**
     * @api {post} /projects/:project_id/roadmaps/:roadmap_id/initiatives Create a new initiative.
     * @apiName AddInitiative
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
     *
     * @apiSuccess {Initiative} initiative Initiative
     */
    .post(function (req, res) {

        var newInitiative = new Initiative();
        fillValues(req, res, newInitiative);
    });

router.route('/projects/:project_id/roadmaps/:roadmap_id/initiatives/:id')

/**
 * @api {put} /projects/:project_id/roadmaps/:roadmap_id/initiatives/:id Create a new initiative.
 * @apiName EditInitiative
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
 * @apiParam {ObjectId} id Unique identifier of an initiative.
 *
 * @apiSuccess {Initiative} initiative Initiative
 */
    .put(function (req, res) {
        var projectId = req.params.project_id;
        var id = req.params.id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }

            var newInitiative = roadmap.initiatives.id(id);

            fillValues(req, res, newInitiative);
        });
    })

    /**
     * @api {delete} /projects/:project_id/roadmaps/:roadmap_id/initiatives/:id Removes initiative.
     * @apiName DeleteInitiative
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
     * @apiParam {ObjectId} id Unique identifier of an initiative.
     *
     * @apiSuccess {Statuscode} statusCode 200
     */
    .delete(function (req, res) {
        var projectId = req.params.project_id;

        Roadmap.findOne(projectId, function (err, roadmap) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            var initiative = roadmap.initiatives.id(id);

            if (initiative != undefined) {
                initiative.remove();
            }
            roadmap.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                } else {
                    return res.status(200).json("Success!");
                }
            });
        });
    });

    //=========FEATURE=========

router.route('/projects/:project_id/roadmaps/:roadmap_id/initiatives/:id/features')

/**
 * @api {post} /projects/:project_id/roadmaps/:roadmap_id/initiatives/:id/feature Create a new feature for an initiative.
 * @apiName AddFeatureToInitiative
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
 * @apiParam {ObjectId} id Unique identifier of an initiative.
 *
 */
    .post(function (req, res) {
        var projectId = req.params.project_id;
        var id = req.params.id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }

            var initiative = roadmap.initiatives.id(id);

            var feature = new Feature();
            feature.title = req.body.title;

            initiative.features.push(feature);

            roadmap.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                } else {
                    return res.status(200).json("Success!");
                }
            });
        });
    })

    /**
     * @api {delete} /projects/:project_id/roadmaps/:roadmap_id/initiatives/:id/feature Delete feature from an initiative.
     * @apiName DeleteFeatureFromInitiative
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
     * @apiParam {ObjectId} id Unique identifier of an initiative.
     * @apiParam {ObjectId} featureId Unique identifier of a feature.
     *
     */
    .delete(function (req, res) {
        var projectId = req.params.project_id;
        var id = req.params.id;
        var featureId = req.body.featureId;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }

            var initiative = roadmap.initiatives.id(id);

            var feature = initiative.features.id(featureId);

            if(feature != undefined){
                feature.remove();
            }

            roadmap.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                } else {
                    return res.status(200).json("Success!");
                }
            });
        });
    });

function fillValues(req, res, created) {
    var projectId = req.params.project_id;

    Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
        if (err) {
            return res.send(err);
        }

        var newInitiative = new Initiative();
        if (!created) {
            newInitiative = roadmap.initiatives.id(req.params.id);
        }

        newInitiative.title = req.body.title;
        newInitiative.startDate = req.body.startDate;
        newInitiative.endDate = req.body.endDate;
        newInitiative.description = req.body.description;
        newInitiative.goal = req.body.goal;

        if (created) {
            roadmap.initiatives.push(newInitiative);
        }

        roadmap.save(function (err) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.json(newInitiative);
        });

    });

}

module.exports = router;