var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var router = express.Router();

var SprintCapacity = mongoose.model('SprintCapacity');
var Sprint = mongoose.model('Sprint');
var Project = mongoose.model('Project');
var BacklogItem = mongoose.model('BacklogItem');
var Task = mongoose.model('Task');

router.route('/projects/:project_id/sprints/:id/burndownchart')

    .get(function (req, res) {
        var projectId = req.params.project_id;
        var sprintId = req.params.id;
        var workingHours = 0;
        var averageHours;


        Sprint.findById(sprintId, function (err, sprint) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            Sprint.find({'sprintCapacity.sprintId': sprintId}, function (err, item) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }

                // sprint time in days
                var Days = sprint.endDate - sprint.startDate;

                // calculate working hours
                for (var x = 0; x < item[0].sprintCapacity.length ; ++x) {
                    workingHours = workingHours + ((parseInt(moment(Days).format('DD')) - item[0].sprintCapacity[x].daysOff) * item[0].sprintCapacity[x].capacityPerDay);
                    console.log('workingHours: ' + workingHours);
                }

                // try to build json string

                var jsonArr = [];
                tempDate = sprint.startDate;
                jsonArr.push({name: "Time Line"});
                for (var tempDate = sprint.startDate; tempDate < sprint.endDate; tempDate = moment(tempDate).add('d', 1)) {

                    jsonArr.push({tempDate: tempDate});

                }
                var jsonString = JSON.stringify(jsonArr);

                return res.json(jsonArr);
            });
        });
    })

module.exports = router;