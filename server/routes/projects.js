var express = require('express');
var router = express.Router();

var Project = require('./../models/project');

router.route('/projects')
    /**
     * @api {get} /projects/ Get all projects.
     * @apiName GetProjects
     * @apiGroup Multiprojektfaehigkeit
     *
     * @apiSuccess {Project[]} projects List of projects.
     * @apiSuccess {ObjectId} projects.id Projects unique identifier.
     * @apiSuccess {String} projects.displayName Name of the project.
     * @apiSuccess {String} projects.description Short description of the project.
     * @apiSuccess {Date} projects.dueDate Deadline of the project.
     * @apiSuccess {ObjectId} projects.owner Identifier of the project owner.
     * @apiSuccess {ObjectId[]} projects.stakeholders List of stakeholders.
     * @apiSuccess {ObjectId[]} projects.contributors List of contributors.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *      {
     *          "_id": "5866bf884ad5122f20a43c16",
     *          "owner": "584ee64035141e2f8006dee8",
     *          "dueDate": "2017-01-31T00:00:00.000Z",
     *          "description": "Ein Klon von Wunderlist - nur viel toller!",
     *          "displayName": "Miraclelist",
     *          "contributors": ["584ee64035141e2f8006dee8"],
     *          "stakeholders": ["584edcda8138b903c8738e12","584ee76281946b3a14242877"]
     *      },
     *      {
     *          "_id": "5866c2252867481cd4fed617",
     *          "owner": "584ee76281946b3a14242877",
     *          "dueDate": "2017-10-01T00:00:00.000Z",
     *          "description": "Ein Spiel für die kurze Pause!",
     *          "displayName": "TicTacToe",
     *          "contributors": ["584edcda8138b903c8738e12","584ee76281946b3a14242877"],
     *          "stakeholders": ["584edcda8138b903c8738e12"]
     *      }
     *     ]
     */
    .get(function (req, res) {
        Project.find(function (err, items) {
            if (err)
                res.send(err);

            res.json(items);
        });
    })
    /**
     * @api {post} /projects/ Create a new project.
     * @apiName AddProject
     * @apiGroup Multiprojektfaehigkeit
     *
     * @apiParam {String} displayName Name of the project.
     * @apiParam {String} description Short description of the project.
     * @apiParam {Date} dueDate Deadline of the project.
     * @apiParam {ObjectId} owner Identifier of the project owner.
     * @apiParam {ObjectId[]} stakeholders List of stakeholders.
     * @apiParam {ObjectId[]} contributors List of contributors.
     *
     * @apiDescription Sample request:
     * {
     *      "displayName": "Miraclelist",
     *      "description": "Ein Klon von Wunderlist - nur viel toller!",
     *      "dueDate": "2017-01-31",
     *      "owner":"584ee64035141e2f8006dee8",
     *      "stakeholders": ["584edcda8138b903c8738e12", "584ee76281946b3a14242877"],
     *      "contributors": ["584ee64035141e2f8006dee8"]
     * }
     *
     * @apiSuccess (200) {ObjectId} Unique identifier of the new project.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "5866c1212867481cd4fed616"
     *     }
     */
    .post(function (req, res) {
        var newItem = new Project();

        newItem.displayName = req.body.displayName;
        newItem.description = req.body.description;
        newItem.dueDate = req.body.dueDate;
        newItem.owner = req.body.owner; // TODO: Check if owner exists
        newItem.stakeholders = req.body.stakeholders;  // TODO: Check if stakeholders exists
        newItem.contributors = req.body.contributors;  // TODO: Check if contributors exists

        newItem.save(function (err) {
            if (err)
                res.send(err);

            res.json({ "id":newItem._id });
        });
    });

router.route('/projects/:id')
    /**
     * @api {get} /projects/:id Retrive one project by its identifier.
     * @apiName GetProject
     * @apiGroup Multiprojektfaehigkeit
     *
     * @apiParam {ObjectId} id Projects unique identifier.
     *
     * @apiSuccess {ObjectId} id Projects unique identifier.
     * @apiSuccess {String} displayName Name of the project.
     * @apiSuccess {String} description Short description of the project.
     * @apiSuccess {Date} dueDate Deadline of the project.
     * @apiSuccess {ObjectId} owner Identifier of the project owner.
     * @apiSuccess {ObjectId[]} stakeholders List of stakeholders.
     * @apiSuccess {ObjectId[]} contributors List of contributors.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "_id": "5866bf884ad5122f20a43c16",
     *         "owner": "584ee64035141e2f8006dee8",
     *         "dueDate": "2017-01-31T00:00:00.000Z",
     *         "description": "Ein Klon von Wunderlist - nur viel toller!",
     *         "displayName": "Miraclelist",
     *         "contributors": ["584ee64035141e2f8006dee8"],
     *         "stakeholders": ["584edcda8138b903c8738e12","584ee76281946b3a14242877"]
     *     }
     */
    .get(function (req, res) {
        Project.findById(req.params.id, function (err, item) {
            if (err)
                res.send(err);

            res.json(item);
        });
    })
    /**
     * @api {put} /projects/:id Update an existing project.
     * @apiName UpdateProject
     * @apiGroup Multiprojektfaehigkeit
     *
     * @apiParam {ObjectId} id Projects unique identifier.
     * @apiParam {String} displayName Name of the project.
     * @apiParam {String} description Short description of the project.
     * @apiParam {Date} dueDate Deadline of the project.
     * @apiParam {ObjectId} owner Identifier of the project owner.
     * @apiParam {ObjectId[]} stakeholders List of stakeholders.
     * @apiParam {ObjectId[]} contributors List of contributors.
     *
     * @apiSuccess (200) {ObjectId} Unique identifier of the new project.
     */
    .put(function (req, res) {
        Project.findById(req.params.id,
            function (err, item) {
                if (err) {
                    console.error(err);

                    return res.sendStatus(404);
                }

                item.displayName = req.body.displayName;
                item.description = req.body.description;
                item.dueDate = req.body.dueDate;
                item.owner = req.body.owner; // TODO: Check if owner exists
                item.stakeholders = req.body.stakeholders;  // TODO: Check if stakeholders exists
                item.contributors = req.body.contributors;  // TODO: Check if contributors exists

                item.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({ "id":item._id });
                });
            });
    })
    /**
     * @api {delete} /projects/:id Delete an existing project.
     * @apiName DeleteProject
     * @apiGroup Multiprojektfaehigkeit
     *
     * @apiParam {ObjectId} id Projects unique identifier.
     *
     */
    .delete(function (req, res) {
        Project.findByIdAndRemove(req.params.id,
            function (deleteErr, deleteRes) {
                if (deleteErr) return console.error(deleteErr);
            });

        return res.json(200);
    });

module.exports = router;