var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var UserStory = mongoose.model('UserStory');
var Project =  mongoose.model('Project');
var User =  mongoose.model('User');

router.route('/databaseInitialisation')
    .get(function (req, res) {
        //
        // REMOVE COLLECTIONS
        //
        UserStory.remove({}, function(err) {}).exec();
        Project.remove({}, function(err) {}).exec();
        User.remove({}, function(err) {}).exec();
        // END REMOVE COLLECTIONS
        //
        // CREATE USERS
        //
        var user1 = new User();
        user1.email = "m.mustermann@scrumjs.de";
        user1.password = user1.generateHash("123");
        user1.firstname = "Max";
        user1.lastname = "Mustermann";
        user1.birthdate = "1990-01-01";
        user1.save();

        var user2 = new User();
        user2.email = "f.fietersen@scrumjs.de";
        user2.password = user2.generateHash("123");
        user2.firstname = "Fiete";
        user2.lastname = "Fietersen";
        user2.birthdate = "1991-03-05";
        user2.save();

        var user3 = new User();
        user3.email = "p.petersen@scrumjs.de";
        user3.password = user3.generateHash("123");
        user3.firstname = "Peter";
        user3.lastname = "Petersen";
        user3.birthdate = "1995-04-20";
        user3.save();
        // END CREATE USERS


        //
        // CREATE PROJECTS
        //
        var project1 = new Project();
        project1.displayName = "Miracle List";
        project1.description = "Klon der Wunderlist App";
        project1.owner = user1._id;
        project1.dueDate =  moment().add(180, 'days');
        project1.stakeholders.push(user2._id, user3._id);
        project1.contributors.push(user1._id, user2._id);
        project1.save();

        var project2= new Project();
        project2.displayName = "Taschenrechner";
        project2.description = "Der echte Alleskönner!";
        project2.owner = user2._id;
        project2.dueDate =  moment().add(360, 'days');
        project2.stakeholders.push(user1._id, user3._id);
        project2.contributors.push(user1._id, user2._id);
        project2.save();
        // END CREATE USERS


        //
        // CREATE USERSTORIESs
        //
        for(var i = 1; i <= 100; i++) {
            var p1UserStory = new UserStory();
            p1UserStory.title = "Anforderung " + i;
            p1UserStory.authorId = (i %2 == 0 ? user1._id : user3._id);
            p1UserStory.authorDisplayName = (i %2 == 0 ? user1.displayName() : user3.displayName());
            p1UserStory.creationDate = Date.now();
            p1UserStory.complete = false;
            project1.userStories.push(p1UserStory);
        }
        for(var i = 1; i <= 100; i++) {
            var p2UserStory = new UserStory();
            p2UserStory.title = "Anforderung " + i;
            p2UserStory.authorId = (i %2 == 0 ? user1._id : user3._id);
            p2UserStory.authorDisplayName = (i %2 == 0 ? user1.displayName() : user3.displayName());
            p2UserStory.creationDate = Date.now();
            p2UserStory.complete = false;
            project2.userStories.push(p2UserStory);
        }
        // END CREATE USERS

        res.sendStatus(200)
    });

module.exports = router;