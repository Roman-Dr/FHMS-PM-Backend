var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Roadmap = mongoose.model('Roadmap');
var RoadmapItem = mongoose.model('Roadmap');
var Project = mongoose.model('Project');
var Feature = mongoose.model('Feature');


router.route('/projects/:project_id/roadmaps/:roadmap_id/roadmapitems')

/**
 * @api {get} /projects/:project_id/roadmaps/:roadmap_id/roadmapitems Get all roadmapitems for one roadmap.
 * @apiName GetRoadmapItems
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 *
 * @apiSuccess {RoadmapItem[]} roadmapItems List of roadmapItems.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }
            return res.json(roadmap.roadmapItems);

        });
    })

    /**
     * @api {post} /projects/:project_id/roadmaps/:roadmap_id/roadmapitems Create a new roadmapItem.
     * @apiName AddRoadmapItem
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
     *
     * @apiSuccess {RoadmapItem} roadmapItem Roadmapitem
     */
    .post(function (req, res) {

        var newRoadmapItem = new RoadmapItem();
        fillValues(req, res, newRoadmapItem);
    });

router.route('/projects/:project_id/roadmaps/:roadmap_id/roadmapitems/:id')

/**
 * @api {put} /projects/:project_id/roadmaps/:roadmap_id/roadmapitems/:id Create a new roadmapItem.
 * @apiName EditRoadmapItem
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
 * @apiParam {ObjectId} id Unique identifier of a roadmapitem.
 *
 * @apiSuccess {RoadmapItem} roadmapItem Roadmapitem
 */
    .put(function (req, res) {
        var projectId = req.params.project_id;
        var id = req.params.id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }

            var newRoadmapItem = roadmap.roadmapItems.id(id);

            fillValues(req, res, newRoadmapItem);
        });
    })

    /**
     * @api {delete} /projects/:project_id/roadmaps/:roadmap_id/roadmapitems/:id Removes roadmapItem.
     * @apiName DeleteRoadmapItem
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
     * @apiParam {ObjectId} id Unique identifier of a roadmapitem.
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
            var roadmapItem = roadmap.roadmapItems.id(id);

            if (roadmapItem != undefined) {
                roadmapItem.remove();
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

router.route('/projects/:project_id/roadmaps/:roadmap_id/roadmapitems/:id/features')

/**
 * @api {post} /projects/:project_id/roadmaps/:roadmap_id/roadmapitems/:id/feature Create a new feature for a roadmapItem.
 * @apiName AddFeatureToItem
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
 * @apiParam {ObjectId} id Unique identifier of a roadmapitem.
 *
 */
    .post(function (req, res) {
        var projectId = req.params.project_id;
        var id = req.params.id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }

            var roadmapItem = roadmap.roadmapItems.id(id);

            var feature = new Feature();
            feature.title = req.body.title;

            roadmapItem.features.push(feature);

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
     * @api {delete} /projects/:project_id/roadmaps/:roadmap_id/roadmapitems/:id/feature Delete feature from a roadmapItem.
     * @apiName DeleteFeatureFromItem
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     * @apiParam {ObjectId} roadmap_id Unique identifier of a roadmap.
     * @apiParam {ObjectId} id Unique identifier of a roadmapitem.
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

            var roadmapItem = roadmap.roadmapItems.id(id);

            var feature = roadmapItem.features.id(featureId);

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

        var newRoadmapItem = new RoadmapItem();
        if (!created) {
            newRoadmapItem = roadmap.roadmapItems.id(req.params.id);
        }

        newRoadmapItem.title = req.body.title;
        newRoadmapItem.startDate = req.body.startDate;
        newRoadmapItem.endDate = req.body.endDate;
        newRoadmapItem.description = req.body.description;
        newRoadmapItem.goal = req.body.goal;

        if (created) {
            roadmap.roadmapItems.push(newRoadmapItem);
        }

        roadmap.save(function (err) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.json(newRoadmapItem);
        });

    });

}

module.exports = router;