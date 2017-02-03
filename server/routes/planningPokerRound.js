var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var User =  mongoose.model('User');
var PlanningPoker =  mongoose.model('PlanningPoker');
var PlanningPokerRound =  mongoose.model('PlanningPokerRound');
var PlanningPokerRoundVote =  mongoose.model('PlanningPokerRoundVote');
var BacklogItem = mongoose.model('BacklogItem');

router.route('/projects/:project_id/planningPokers/:planning_poker_id/rounds')
    .post(function(req, res){
        PlanningPoker.findById(req.params.planning_poker_id, function(err, planningPoker){
            var newItem = new PlanningPokerRound();

            newItem.number = planningPoker.rounds.length + 1;
            newItem.state = 'Pending';
            newItem.electedEffort = 0;

            planningPoker.activeRound = newItem.number;
            planningPoker.rounds.push(newItem);

            planningPoker.save(function (err) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }

                return res.json(newItem);
            });
        });
    });

router.route('/projects/:project_id/planningPokers/:planning_poker_id/rounds/:planning_poker_round_id')
    .put(function(req, res){
        PlanningPoker.findById(req.params.planning_poker_id, function(err, planningPoker){
            var planningPokerRound = planningPoker.rounds.id(req.params.planning_poker_round_id);
            if (planningPokerRound) {
                planningPokerRound.state = req.body.state;
                if(planningPokerRound.state == "Accepted") {
                    planningPokerRound.electedEffort = req.body.vote.effort;
                    planningPoker.effort = planningPokerRound.electedEffort;
                    planningPoker.isActive = false;
                    //planningPoker.activeRound = 0;
                    planningPoker.finishDateTime = new Date();

                    // Update backlogItem!
                    BacklogItem.findById(planningPoker.item, function(errBacklogItem, backlogItem) {
                        backlogItem.effort = planningPoker.effort;

                        backlogItem.save(function(err){
                            if (err) {
                                console.error(err);
                                return res.send(err);
                            }

                            planningPoker.save(function (err) {
                                if (err) {
                                    console.error(err);
                                    return res.send(err);
                                }

                                return res.json(planningPokerRound);
                            });
                        });
                    });
                } else {
                    planningPoker.save(function (err) {
                        if (err) {
                            console.error(err);
                            return res.send(err);
                        }

                        return res.json(planningPokerRound);
                    });
                }
            }else {
                return res.status(404).send();
            }
        });
    });

router.route('/projects/:project_id/planningPokers/:planning_poker_id/rounds/:planning_poker_round_id/votes')
    .post(function (req, res) {
        PlanningPoker.findById(req.params.planning_poker_id, function(err, planningPoker){
            User.findById(req.body.voterId, function(errUser, user){
                console.log('Vote: ' + JSON.stringify(req.body));

                var planningPokerRound = planningPoker.rounds[planningPoker.activeRound-1];

                var newItem = new PlanningPokerRoundVote();

                newItem.voterId = req.body.voterId;
                newItem.voterDisplayName = user.displayName();
                newItem.effort = req.body.effort;
                newItem.reason = req.body.reason;

                planningPokerRound.votes.push(newItem);

                planningPokerRound.votesCount = planningPokerRound.votes.length;

                planningPoker.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }

                    return res.json(newItem);
                });
            });
        });
    });


module.exports = router;