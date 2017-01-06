var express = require('express');
var router = express.Router();

var UserStory = require('./../models/userstory');

router.route('/userstories')
/**
 * @api {get} /userstories/ Get all user stories.
 * @apiName GetUserStories
 * @apiGroup Backlog
 *
 * @apiSuccess {Userstory[]} userstories List of user stories.
 * @apiSuccess {ObjectId} userstories._id User stories unique identifier.
 * @apiSuccess {String} userstories.title The text of the user story.
 * @apiSuccess {String} userstories.author Author of the user story.
 * @apiSuccess {Boolean} userstories.complete State of the user story.
 * @apiSuccess {Date} userstories.timestmp Timestmp of the user story.
 */
    .get(function (req, res) {
        UserStory.find(function (err, userstories) {
            if (err)
                return res.send(err);
            console.log('Alle User Stories wurden per GET aufgerufen');
            res.json(userstories);
        });
    })
    /**
     * @api {post} /userstories/ Create a new single user story.
     * @apiName AddUserStory
     * @apiGroup Backlog
     *
     * @apiParam {String} title The text of the user story.
     * @apiParam {String} author Author of the user story.
     * @apiParam {Boolean} complete State of the user story.
     * @apiParam {Date} timestmp Timestmp of the user story.
     *
     * @apiSuccess {ObjectId} _id User stories unique identifier.
     * @apiSuccess {String} title The text of the user story.
     * @apiSuccess {String} author Author of the user story.
     * @apiSuccess {Boolean} complete State of the user story.
     * @apiSuccess {Date} timestmp Timestmp of the user story.
     *
     */
    .post(function (req, res) {
        var newUserStory = new UserStory();

        newUserStory.title = req.body.title;
        newUserStory.author = req.body.author;
        newUserStory.complete = req.body.complete;
        newUserStory.timestmp = req.body.timestmp;

        newUserStory.save(function (err) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            console.log('Eine neue User Stories wurde angelegt');
            res.json({message: 'New story ' + newUserStory.displayTitle() + ' was created!', data: newUserStory});
        });
    });

router.route('/userstory/:id')
/**
 * @api {get} /userstory/:id Retrieve an existing user story by her id.
 * @apiName GetUserStory
 * @apiGroup Backlog
 *
 * @apiParam {ObjectId} _id Userstories unique identifier.
 *
 * @apiSuccess {ObjectId} _id User stories unique identifier.
 * @apiSuccess {String} title The text of the user story.
 * @apiSuccess {String} author Author of the user story.
 * @apiSuccess {Boolean} complete State of the user story.
 * @apiSuccess {Date} timestmp Timestmp of the user story.
 *
 */
    .get(function (req, res) {
        User.findById(req.params.id, function (err, userstory) {
            if (err) {
                console.error(err);
                return res.send(err);
            }
            console.log('Eine User Stories wurde aufgerufen');
            res.json(userstory);
        });
    })

    /**
     * @api {put} /userstory/:id Update an existing user story.
     * @apiName UpdateUserStory
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} _id User stories unique identifier.
     * @apiParam {String} title The text of the user story.
     * @apiParam {String} author Author of the user story.
     * @apiParam {Boolean} complete State of the user story.
     * @apiParam {Date} timestmp Timestmp of the user story.
     *
     * @apiSuccess {ObjectId} _id User stories unique identifier.
     * @apiSuccess {String} title The text of the user story.
     * @apiSuccess {String} author Author of the user story.
     * @apiSuccess {Boolean} complete State of the user story.
     * @apiSuccess {Date} timestmp Timestmp of the user story.
     *
     */
    .put(function (req, res) {
        User.findById(req.params.id,
            function (err, userstory) {
                if (err) {
                    console.error(err);

                    return res.sendStatus(404);
                }
                newUserStory.title = req.body.title;
                newUserStory.author = req.body.author;
                newUserStory.complete = req.body.complete;
                newUserStory.timestmp = req.body.timestmp;

                user.save(function (err) {
                    if (err) {
                        console.error(err);
                        return res.send(err);
                    }
                    console.log('Eine User Stories wurde aktualisiert');
                    res.json({message: 'Userstory was updated!', data: userstory});
                });
            });
    })

    /**
     * @api {delete} /userstory/:id Delete an existing user story.
     * @apiName DeleteUserStory
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} _id User stories unique identifier.
     *
     */
    .delete(function (req, res) {
        User.findByIdAndRemove(req.params.id,
            function (err, deleteRes) {
                if (err) {
                    console.error(err);
                    return res.send(err);
                }
                console.log('Eine User Stories wurde gelöscht');
            });
        return res.json(200);
    });

module.exports = router;