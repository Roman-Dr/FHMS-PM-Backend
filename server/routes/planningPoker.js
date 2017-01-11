var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var PlanningPoker =  mongoose.model('PlanningPoker');
var PlanningPokerRound =  mongoose.model('PlanningPokerRound');
var PlanningPokerRoundVote =  mongoose.model('PlanningPokerRoundVote');

router.route('/projects/:project_id/planningPokers')
    .post(function (req, res) {


        var moderatorId = req.body.moderatorId;
        var itemId = req.body.itemId;
        var itemType = !req.body.itemType ? 'BacklogItem' : req.body.itemType;

        PlanningPoker.findOne({ 'itemId': itemId }, function (err, item) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            if(!item) {
                var newItem = new PlanningPoker();

                newItem.moderatorId = moderatorId;
                newItem.itemId = itemId;
                newItem.itemType = itemType;
                newItem.creationDateTime = moment();
                newItem.finishDateTime = null;
                newItem.participants = [];
                newItem.rounds = [];
                newItem.effort = 0;

                newItem.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }

                    res.json({ "id":newItem._id });
                });
            } else {
                var idInJson = item._id.toJSON();

                return res.status(409).json({error: 'PlanningPoker already exists!', id: idInJson}).send();
            }
        });
    });

router.route('/projects/:project_id/planningPokers/:planning_poker_id')
    .get(function(req, res) {
        PlanningPoker.findById(req.params.planning_poker_id, function (err, item) {
            if (err) {
                console.error(err);
                return res.status(404).send('PlanningPoker does not exists.');
            }

            res.json(item);
        });
    });

module.exports = router;