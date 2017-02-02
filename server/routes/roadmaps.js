var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var router = express.Router();

var Roadmap = mongoose.model('Roadmap');
var Project = mongoose.model('Project');


router.route('/projects/:project_id/roadmaps')

/**
 * @api {get} /projects/:project_id/roadmaps/ Get the roadmap for one project.
 * @apiName GetRoadmap
 * @apiGroup Roadmap
 *
 * @apiParam {ObjectId} project_id Unique identifier of a project.
 *
 * @apiSuccess {Roadmap} roadmap.
 */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }
            return res.json(roadmap);
        });
    })

    /**
     * @api {post} /projects/:project_id/roadmaps/ Create a new roadmap.
     * @apiName AddRoadmap
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     *
     * @apiSuccess {Roadmap} roadmap Roadmap.
     */
    .post(function (req, res) {
        var projectId = req.params.project_id;

        Roadmap.findOne({projectId: projectId}, function (err, roadmap) {
            if (err) {
                return res.send(err);
            }
            if (roadmap == null) {
                var newRoadmap = new Roadmap();
                fillValues(req, res, newRoadmap);
            } else {
                return res.status(409).json("Project already owns a roadmap!");
            }
        });
    })

    /**
     * @api {put} /projects/:project_id/roadmaps/ Create a new roadmap.
     * @apiName AddRoadmap
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     *
     * @apiSuccess {Roadmap} roadmap Roadmap.
     */
    .put(function (req, res) {
        var projectId = req.params.project_id;

        Roadmap.findOne({projectId: projectId}, function (err, newRoadmap) {//TODO: Prüfen ob Projekt auch abgefragt werden muss.
            if (err) {
                return res.send(err);
            }
            fillValues(req, res, newRoadmap);
        });
    })

    /**
     * @api {delete} /projects/:project_id/roadmaps Delete an existing roadmap.
     * @apiName DeleteRoadmap
     * @apiGroup Roadmap
     *
     * @apiParam {ObjectId} project_id Unique identifier of a project.
     *
     */
    .delete(function (req, res) {
        var projectId = req.params.project_id;

        Roadmap.findOneAndRemove(projectId,
            function (err, res) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
            });
        return res.status(200).json("Success");
    });

function fillValues(req, res, newRoadmap) {
    var projectId = req.params.project_id;

    Project.findById(projectId, function (err, project) {
        if (err) {
            return res.send(err);
        }

        newRoadmap.projectId = projectId;
        newRoadmap.projectDisplayName = project.sprintName;

        newRoadmap.title = req.body.title;
        newRoadmap.projectId = projectId;
        newRoadmap.projectDisplayTitle = project.displayName;

        newRoadmap.save(function (err) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            return res.json(newRoadmap);
        });

    });

}

module.exports = router;