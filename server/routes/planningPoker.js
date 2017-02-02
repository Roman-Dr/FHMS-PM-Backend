var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var PlanningPoker =  mongoose.model('PlanningPoker');
var PlanningPokerRound =  mongoose.model('PlanningPokerRound');
var PlanningPokerRoundVote =  mongoose.model('PlanningPokerRoundVote');

router.route('/projects/:project_id/planningPokers')
    .post(function (req, res) {
        var itemId = req.body.item._id;

        PlanningPoker.findOne({ 'itemId': itemId }, function (err, item) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            if(!item) {
                var newItem = new PlanningPoker();

                newItem.creationDateTime = moment();

                newItem.moderator = req.body.moderator._id;
                newItem.project = req.body.project._id;
                newItem.item = itemId;

                newItem.participants = [];
                newItem.rounds = [];

                newItem.isActive = true;
                newItem.isStarted = false;
                newItem.activeRound = 0;
                newItem.effort = 0;

                newItem.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }

                    return res.json(newItem);
                });
            } else {
                var idInJson = item._id.toJSON();

                return res.status(409).json({error: 'PlanningPoker already exists!', id: idInJson}).send();
            }
        });
    });

router.route('/projects/:project_id/activePlanningPokers')
    .get(function(req, res){
        var projectId = req.params.project_id;
        PlanningPoker.find({ project: projectId, isActive: true }, function (err, activePlanningPokers) {
            return res.json(activePlanningPokers);
        }).populate(['participants', 'moderator', 'project']);
    });

router.route('/projects/:project_id/planningPokers/:planning_poker_id')
    .get(function(req, res) {
        PlanningPoker.findById(req.params.planning_poker_id, function (err, item) {
            if (err) {
                console.error(err);
                return res.status(404).send('PlanningPoker does not exists.');
            }

            res.json(item);
        }).populate(['participants', 'moderator', 'project']);
    })
    .delete(function(req, res) {
        PlanningPoker.findByIdAndRemove(req.params.planning_poker_id, function (deleteErr, deleteRes) {
            if (deleteErr) {return console.error(deleteErr);}else {
                return res.status(200).send();
            }
        });
    })
    .put(function (req, res) {
        PlanningPoker.findById(req.params.planning_poker_id, function (err, item) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            console.log('PUT: ' + JSON.stringify(item));
            console.log('PUT-REQ-BODY: ' + JSON.stringify(req.body));
            if(item) {
                item.isStarted = req.body.isStarted;
                item.activeRound = req.body.activeRound;
                item.effort = req.body.effort;

                // TODO: Update subdocuments

                item.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }

                    return res.json(item);
                });
            } else {
                return res.status(404).json({error: 'PlanningPoker not exists!'}).send();
            }
        });
    });

router.route('/projects/:project_id/planningPokers/:planning_poker_id/activeRound')
    .get(function(req, res){
        PlanningPoker.findById(req.params.planning_poker_id, function (err, item) {
            if (err) {
                console.error(err);
                return res.status(404).send('PlanningPoker does not exists.');
            }

            if(item.activeRound > 0) {
                return res.json(item.rounds[item.activeRound-1]);
            } else {
               return res.send();
            }
        });
    });
router.route('/projects/:project_id/planningPokers/:planning_poker_id/participants')
    .post(function(req, res){
        PlanningPoker.findById(req.params.planning_poker_id, function (err, item) {
            if (err) {
                console.error(err);
                return res.status(404).send('PlanningPoker does not exists.');
            }
    
            var userId = req.body.userId;
    
            if(item.participants.indexOf(userId) == -1) {
                item.participants.push(userId);
    
                item.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
    
                    return res.status(200).send();
                });
            }
    
            return res.status(200).send();
        });
    })
    .get(function (req, res) {
        PlanningPoker.find({_id: req.params.planning_poker_id}, 'participants', function (err, item) {
            if (err) {
                console.error(err);
                return res.status(404).send('PlanningPoker does not exists.');
            }

            res.json(item.participants);
        }).populate(['participants']);
    });
router.delete('/projects/:project_id/planningPokers/:planning_poker_id/participants/:participant_id', function(req, res) {
    PlanningPoker.findById(req.params.planning_poker_id, function (err, item) {
        if (err) {
            console.error(err);
            return res.status(404).send('PlanningPoker does not exists.');
        }

        var userId = req.params.participant_id;
        var index = item.participants.indexOf(userId);
        if(index > -1) {
            item.participants.splice(index, 1);

            item.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }

                return res.status(200).send();
            });
        }

        return res.status(200).send();
    })});

module.exports = router;