var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var UserStory = mongoose.model('UserStory');
var Project =  mongoose.model('Project');
var User =  mongoose.model('User');

var UserStoryValidator = require('./../validation/userStoryValidator');

router.route('/projects/:project_id/userStories')
    /**
     * @api {get} /projects/:project_id/userStories Get all user stories.
     * @apiName GetUserStories
     * @apiGroup Backlog
     *
     * @apiSuccess {Userstory[]} userstories List of user stories.
     * @apiSuccess {ObjectId} userstories._id User stories unique identifier.
     * @apiSuccess {String} userstories.title The text of the user story.
     * @apiSuccess {ObjectId} userstories.authorId AuthorId of the user story.
     * @apiSuccess {String} userstories.authorDisplayName Author´s first and last name of the user story.
     * @apiSuccess {Boolean} userstories.complete State of the user story.
     * @apiSuccess {Date} userstories.creationDate Date of creation of the user story.
     */
    .get(function (req, res) {
        var projectId = req.params.project_id;

        Project.findById(projectId, function (err, item) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            console.log('GET: UserStories for project id ' + projectId);

            res.json(item.userStories);
        });
    })
    /**
     * @api {post} /projects/:project_id/userStories Create a new user story.
     * @apiName AddUserStory
     * @apiGroup Backlog
     *
     * @apiParam {String} title The text of the user story.
     * @apiParam {ObjectId} authorId Author´s identifier of the user story.
     * @apiParam {Boolean} complete State of the user story.
     *
     * @apiSuccess {ObjectId} _id User stories unique identifier.
     *
     */
    .post(function (req, res) {
        var projectId = req.params.project_id;
        var authorId = req.body.authorId;

        var validator = new UserStoryValidator();
        var validationResult = validator.validate(req.body);
        if(!validationResult.isValid()) {
            return res.status(460).send(validationResult.toResult());
        }

        Project.findById(projectId, function (err, project) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            console.log('POST: Create new UserStory for project id ' + projectId);

            User.findById(authorId, function (err, user) {
                if(err) {
                    console.error(error);
                }

                var newUserStory = new UserStory();

                newUserStory.title = req.body.title;
                newUserStory.authorId = authorId;
                newUserStory.complete = req.body.complete;
                newUserStory.creationDate = Date.now();

                if(user == undefined) {
                    newUserStory.authorDisplayName = undefined;
                } else {
                    newUserStory.authorDisplayName = user.displayName();
                }

                project.userStories.push(newUserStory);

                project.save(function (err) {
                    if(err){
                        console.error(err);
                        return res.send(err);
                    }else {
                        console.log('UserStory in project ' + projectId + ' created.');

                        return res.json(newUserStory._id);
                    }
                });
            });
        });
    });

router.route('/projects/:project_id/userStories/:id')
    /**
     * @api {get} /projects/:project_id/userStories/:id Retrieve an existing user story by her id.
     * @apiName GetUserStory
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} _id Userstories unique identifier.
     *
     * @apiSuccess {ObjectId} _id User stories unique identifier.
     * @apiSuccess {String} title The text of the user story.
     * @apiSuccess {ObjectId} authorId AuthorId of the user story.
     * @apiSuccess {String} authorDisplayName Author´s first and last name of the user story.
     * @apiSuccess {Boolean} complete State of the user story.
     * @apiSuccess {Date} creationDate Date of creation of the user story.
     *
     */
    .get(function (req, res) {
        var projectId = req.params.project_id;
        var userStoryId = req.params.id;

        Project.findById(projectId, function (err, project) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            console.log('Get UserStory ' + userStoryId + ' from Project ' + projectId);

            res.json(project.userStories.id(userStoryId));
        });
    })

    /**
     * @api {put} /projects/:project_id/userStories/:id Update an existing user story.
     * @apiName UpdateUserStory
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} _id User stories unique identifier.
     * @apiParam {String} title The text of the user story.
     * @apiParam {ObjectId} authorId Author´s identifier of the user story.
     * @apiParam {Boolean} complete State of the user story.
     *
     */
    .put(function (req, res) {
        var projectId = req.params.project_id;
        var userStoryId = req.params.id;
        var authorId = req.body.authorId;

        var validator = new UserStoryValidator();
        var validationResult = validator.validate(req.body);
        if(!validationResult.isValid()) {
            return res.status(460).send(validationResult.toResult());
        }

        Project.findById(projectId, function (err, project) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            var userStory = project.userStories.id(userStoryId);

            console.log('PUT: Update a UserStory for project id ' + projectId);

            User.findById(authorId, function (err, user) {
                if(err) {
                    console.error(error);
                }

                userStory.title = req.body.title;
                userStory.authorId = authorId;
                userStory.complete = req.body.complete;

                if(user == undefined) {
                    userStory.authorDisplayName = undefined;
                } else {
                    userStory.authorDisplayName = user.displayName();
                }

                project.save(function (err) {
                    if(err){
                        console.error(err);
                        return res.send(err);
                    }else {
                        console.log('UserStory ' + userStoryId + ' in project ' + projectId + ' updated.');

                        return res.json(200);
                    }
                });
            });
        });
    })

    /**
     * @api {delete} /projects/:project_id/userStories/:id Delete an existing user story.
     * @apiName DeleteUserStory
     * @apiGroup Backlog
     *
     * @apiParam {ObjectId} _id User stories unique identifier.
     *
     */
    .delete(function (req, res) {
        var projectId = req.params.project_id;
        var userStoryId = req.params.id;

        Project.findById(projectId, function (err, project) {
            if (err) {
                console.error(err);
                return res.send(err);
            }

            var userStory = project.userStories.id(userStoryId);

            if (userStory != undefined) {
                userStory.remove();

                console.log('UserStory ' + userStoryId + ' removed from project ' + projectId);
            }

            project.save(function (err) {
                if(err){
                    console.error(err);
                    return res.send(err);
                }else {
                    return res.json(200);
                }
            });
        });
    });

module.exports = router;