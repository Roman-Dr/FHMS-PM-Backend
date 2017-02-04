var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var SprintRetrospective = mongoose.model('SprintRetrospective');
var Sprint = mongoose.model('Sprint');
var User = mongoose.model('User');

router.route('/projects/:project_id/sprints/:sprint_id/retrospective')
    .get(function (req, res) {
        var sprintId = req.params.id;

        Sprint.findById(req.params.sprint_id, function (err, sprint) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            return res.json(sprint.retrospective);
        });
    })
    .post(function (req, res) {
        var sprintId = req.params.id;

        Sprint.findById(req.params.sprint_id, function (err, sprint) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            sprint.retrospective.splice(0, sprint.retrospective.length);

            sprint.retrospective.push(req.body.retrospective);

            sprint.save(function(err){
                if (err) {
                    console.error(err);
                    return res.send(err);
                }

                return res.json(sprint.retrospective);
            });
        });
    });

module.exports = router;