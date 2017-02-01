var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var SprintCapacity = mongoose.model('SprintCapacity');
var BacklogItem = mongoose.model('BacklogItem');
var Sprint = mongoose.model('Sprint');
var SprintBurnDownMeasure = mongoose.model('SprintBurnDownMeasure');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

module.exports = {
    calculateRemainingWork: function () {
        var current = new Date(new Date().toLocaleDateString()); // !!! IMPORTANT: REMOVE TIME

        console.log("Calculate Sprint remaining for date: " + current);

        Sprint.find({startDate: {"$lte": current}, endDate: {"$gte": current}}, function (err, sprints) {
            console.log('Sprints: ' + JSON.stringify(sprints));

            // Get Tasks from sprint
            for (var i = 0; i < sprints.length; i++) {
                var sprint = sprints[i];
                var remainingWork = 0;

                console.log("Sprint: "+ sprint.sprintName);

                BacklogItem.find({sprintId: sprint._id}, function (errorBacklogItem, backlogItems) {
                    if(backlogItems && backlogItems.length > 0) {
                        console.log("Tasks: " + JSON.stringify(backlogItems));

                        var backlogItemEffort = 0;
                        for(var j = 0; j < backlogItems.length; j++) {
                            var backlogItem = backlogItems[j];

                            if(backlogItem.effort > 0) {
                                backlogItemEffort += backlogItem.effort;
                            }

                            for (var h = 0; h < backlogItem.tasks.length; h++) {
                                var task = backlogItem.tasks[h];

                                if(task.state == "New" || task.state == "In Progress" || task.state == "To Do") {
                                    // Relevant für verbl. Aufwand
                                    if(task.remainingWork > 0) {
                                        remainingWork = remainingWork + task.remainingWork;
                                    }
                                }
                            }
                        }

                        Sprint.findById(backlogItems[0].sprintId, function (err, sprintToUpdate) {
                            var sprintBurnDownMeasurement = undefined;
                            for(var j = 0; j < sprintToUpdate.sprintBurnDownMeasures.length; j++) {
                                if(sprintToUpdate.sprintBurnDownMeasures[j].dateOfMeasurement.getTime() == current.getTime()) {
                                    sprintBurnDownMeasurement = sprintToUpdate.sprintBurnDownMeasures[j];
                                    break;
                                }
                            }

                            if(sprintBurnDownMeasurement == undefined) {
                                sprintBurnDownMeasurement = new SprintBurnDownMeasure();
                                sprintBurnDownMeasurement.dateOfMeasurement = current;
                                sprintBurnDownMeasurement.remainingWorkTillNow = remainingWork;
                                sprintToUpdate.sprintBurnDownMeasures.push(sprintBurnDownMeasurement);
                            } else {
                                sprintBurnDownMeasurement.dateOfMeasurement = current;
                                sprintBurnDownMeasurement.remainingWorkTillNow = remainingWork;
                            }

                            sprintToUpdate.effort = backlogItemEffort;
                            sprintToUpdate.remainingWork = remainingWork;

                            sprintToUpdate.save(function (err) {
                                console.log('Sprint ' + sprintToUpdate._id + ' updated.');
                            });
                        });
                    }
                });
            }
        });
    }
};