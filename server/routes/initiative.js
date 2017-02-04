var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Initiative = mongoose.model('Initiative');
var Project = mongoose.model('Project');
var Feature = mongoose.model('Feature');


router.route('/projects/:project_id/initiatives')

/**
 * @api {get} /projects/:project_id/initiatives Get all initiatives for one roadmap.
 * @apiName GetInitiatives
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 *
 * @apiSuccess {Initiative[]} initiatives List of initiatives.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        Initiative.find({projectId: projectId}, function (err, initiative) {
            if (err) {
                return res.send(err);
            }
            return res.json(initiative);

        }).sort({startDate: 1});
    })

    /**
     * @api {post} /projects/:project_id/initiatives Create a new initiative.
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

router.route('/projects/:project_id/initiatives/:id')

/**
 * @api {put} /projects/:project_id/initiatives/:id Create a new initiative.
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

        Initiative.findOne({projectId: projectId, _id: id}, function (err, initiative) {
            if (err) {
                return res.send(err);
            }

            fillValues(req, res, initiative);
        });
    })

    /**
     * @api {delete} /projects/:project_id/initiatives/:id Removes initiative.
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
        var id = req.params.id;

        Initiative.findOneAndRemove({projectId: projectId, _id: id}, function (err, initiative) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.status(200).json("Success!");
        });
    });

//=========FEATURE=========

router.route('/projects/:project_id/initiatives/:id/features')

    .get(function (req, res) {
        var projectId = req.params.project_id;
        var id = req.params.id;

        Initiative.findOne({projectId: projectId, _id: id}, function (err, initiative) {
            if (err) {
                return res.send(err);
            }

            return res.json(initiative.features);
        });
    })

    /**
     * @api {post} /projects/:project_id/initiatives/:id/feature Create a new feature for an initiative.
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

        Initiative.findOne({projectId: projectId, _id: id}, function (err, initiative) {
            if (err) {
                return res.send(err);
            }

            var feature = new Feature();
            feature.title = req.body.title;

            initiative.features.push(feature);


            initiative.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
                return res.status(200).json("Success!");
            });
        });
    });

router.route('/projects/:project_id/initiatives/:initiative_id/features/:id')
    /**
     * @api {delete} /projects/:project_id/initiatives/:id/feature Delete feature from an initiative.
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
        var initiativeId = req.params.initiative_id;
        var featureId = req.params.id;

        Initiative.findOne({projectId: projectId, _id: initiativeId}, function (err, initiative) {
            if (err) {
                return res.send(err);
            }


            var feature = initiative.features.id(featureId);

            if (feature != undefined) {
                feature.remove();
            }

            initiative.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
                return res.status(200).json("Success!");
            });
        });
    });

function fillValues(req, res, newInitiative) {

    newInitiative.projectId = req.params.project_id;
    newInitiative.title = req.body.title;
    if(req.body.startDate != null){
        newInitiative.startDate = new Date(req.body.startDate);
    }
    if(req.body.endDate != null){
        newInitiative.endDate = new Date(req.body.endDate);
    }
    newInitiative.description = req.body.description;
    newInitiative.goal = req.body.goal;

    newInitiative.save(function (err) {
        if (err) {
            console.error(err);
            return res.send(err);
        }
        return res.json(newInitiative);
    });

}

module.exports = router;