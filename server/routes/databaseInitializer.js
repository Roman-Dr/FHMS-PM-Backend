var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

var UserStory = mongoose.model('UserStory');
var Project = mongoose.model('Project');
var User = mongoose.model('User');
var Initiative = mongoose.model('Initiative');
var Feature = mongoose.model('Feature');
var Sprint = mongoose.model('Sprint');
var SprintCapacity = mongoose.model('SprintCapacity');
var SprintBurnDownMeasure = mongoose.model('SprintBurnDownMeasure');
var SprintRetrospective = mongoose.model('SprintRetrospective');
var PlanningPoker = mongoose.model('PlanningPoker');
var BacklogItem = mongoose.model('BacklogItem');

router.route('/databaseInitialisation')
    .get(function (req, res) {
        //
        // REMOVE COLLECTIONS
        //
        UserStory.remove({}, function (err) {
        }).exec();
        Project.remove({}, function (err) {
        }).exec();
        User.remove({}, function (err) {
        }).exec();
        Initiative.remove({}, function (err) {
        }).exec();
        Feature.remove({}, function (err) {
        }).exec();
        Sprint.remove({}, function (err) {
        }).exec();
        SprintCapacity.remove({}, function (err) {
        }).exec();
        SprintRetrospective.remove({}, function (err) {
        }).exec();
        BacklogItem.remove({}, function (err) {
        }).exec();
        PlanningPoker.remove({}, function (err) {
        }).exec();
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
        user1.role = "Scrum Master";
        user1.save();

        var user2 = new User();
        user2.email = "f.fietersen@scrumjs.de";
        user2.password = user2.generateHash("123");
        user2.firstname = "Fiete";
        user2.lastname = "Fietersen";
        user2.birthdate = "1991-03-05";
        user2.role = "Development Team";
        user2.save();

        var user3 = new User();
        user3.email = "p.petersen@scrumjs.de";
        user3.password = user3.generateHash("123");
        user3.firstname = "Peter";
        user3.lastname = "Petersen";
        user3.birthdate = "1995-04-20";
        user3.role = "Development Team";
        user3.save();

        var user4 = new User();
        user4.email = "l.mueller@scrumjs.de";
        user4.password = user4.generateHash("123");
        user4.firstname = "Lieschen";
        user4.lastname = "Müller";
        user4.birthdate = "1988-08-08";
        user4.role = "Development Team";
        user4.save();

        var user5 = new User();
        user5.email = "j.doe@scrumjs.de";
        user5.password = user5.generateHash("123");
        user5.firstname = "John";
        user5.lastname = "Doe";
        user5.birthdate = "1993-03-03";
        user5.role = "Development Team";
        user5.save();

        var user6 = new User();
        user6.email = "j.controlletti@scrumjs.de";
        user6.password = user6.generateHash("123");
        user6.firstname = "Johnny";
        user6.lastname = "Controlletti";
        user6.birthdate = "1976-06-09";
        user6.role = "Product Owner";
        user6.save();
        // END CREATE USERS


        //
        // CREATE PROJECTS
        //
        var project1 = new Project();
        project1.displayName = "Leeres Projekt";
        project1.description = "Zur Veranschaulicht der Multiprojektfähigkeit";
        project1.owner = user1._id;
        project1.dueDate = moment().add(180, 'days');
        project1.stakeholders.push(user2._id, user3._id);
        project1.contributors.push(user1._id, user2._id);
        project1.save();

        var project2 = new Project();
        project2.displayName = "ScrumJS";
        project2.description = "Ein spitzenmäßiges PM-Tool!";
        project2.owner = user6._id;
        project2.dueDate = "2017-02-10";
        project2.stakeholders.push(user6._id);
        project2.contributors.push(user1._id, user2._id, user3._id, user4._id, user5._id);
        project2.save();
        // END CREATE PROJECTS


        //
        // CREATE SPRINTS
        //
        /*
         var sprint1 = new Sprint();
         sprint1.sprintName = "Sprint 1";
         sprint1.startDate = moment().add(180, 'days');
         sprint1.endDate = moment().add(180, 'days');
         sprint1.projectId = project1.id;
         sprint1.projectDisplayName = project1.displayName;
         sprint1.save();

         var sprint2 = new Sprint();
         sprint2.sprintName = "Sprint 2";
         sprint2.startDate = moment().add(180, 'days');
         sprint2.endDate = moment().add(180, 'days');
         sprint2.projectId = project1.id;
         sprint2.projectDisplayName = project1.displayName;
         sprint2.save();
         */

        var p2sprint1 = new Sprint();
        p2sprint1.sprintName = "Sprint 1";
        p2sprint1.startDate = "2017-01-16";
        p2sprint1.endDate = "2017-01-31";
        p2sprint1.effort = 65;
        p2sprint1.projectId = project2.id;
        p2sprint1.projectDisplayName = project2.displayName;
        p2sprint1.save();

        var p2sprint2 = new Sprint();
        p2sprint2.sprintName = "Sprint 2";
        p2sprint2.startDate = "2017-02-01";
        p2sprint2.endDate = "2017-02-28";
        p2sprint2.projectId = project2.id;
        p2sprint2.projectDisplayName = project2.displayName;
        p2sprint2.save();
        // END CREATE SPRINTS

        //
        // CREATE SPRINTCAPACITYS
        //
        //Sprint 1
        var p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user1._id;
        p2SprintCapacity.userDisplayName = user1.displayName();
        p2SprintCapacity.sprintId = p2sprint1._id;
        p2SprintCapacity.daysOff = 6;
        p2SprintCapacity.capacityPerDay = 7;
        p2sprint1.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user2._id;
        p2SprintCapacity.userDisplayName = user2.displayName();
        p2SprintCapacity.sprintId = p2sprint1._id;
        p2SprintCapacity.daysOff = 5;
        p2SprintCapacity.capacityPerDay = 8;
        p2sprint1.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user3._id;
        p2SprintCapacity.userDisplayName = user3.displayName();
        p2SprintCapacity.sprintId = p2sprint1._id;
        p2SprintCapacity.daysOff = 7;
        p2SprintCapacity.capacityPerDay = 4;
        p2sprint1.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user4._id;
        p2SprintCapacity.userDisplayName = user4.displayName();
        p2SprintCapacity.sprintId = p2sprint1._id;
        p2SprintCapacity.daysOff = 6;
        p2SprintCapacity.capacityPerDay = 7;
        p2sprint1.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user5._id;
        p2SprintCapacity.userDisplayName = user5.displayName();
        p2SprintCapacity.sprintId = p2sprint1._id;
        p2SprintCapacity.daysOff = 2;
        p2SprintCapacity.capacityPerDay = 6;
        p2sprint1.sprintCapacity.push(p2SprintCapacity);

        //Sprint 2
        var p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user1._id;
        p2SprintCapacity.userDisplayName = user1.displayName();
        p2SprintCapacity.sprintId = p2sprint2._id;
        p2SprintCapacity.daysOff = 9;
        p2SprintCapacity.capacityPerDay = 6;
        p2sprint2.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user2._id;
        p2SprintCapacity.userDisplayName = user2.displayName();
        p2SprintCapacity.sprintId = p2sprint2._id;
        p2SprintCapacity.daysOff = 10;
        p2SprintCapacity.capacityPerDay = 7;
        p2sprint2.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user3._id;
        p2SprintCapacity.userDisplayName = user3.displayName();
        p2SprintCapacity.sprintId = p2sprint2._id;
        p2SprintCapacity.daysOff = 12;
        p2SprintCapacity.capacityPerDay = 4;
        p2sprint2.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user4._id;
        p2SprintCapacity.userDisplayName = user4.displayName();
        p2SprintCapacity.sprintId = p2sprint2._id;
        p2SprintCapacity.daysOff = 8;
        p2SprintCapacity.capacityPerDay = 8;
        p2sprint2.sprintCapacity.push(p2SprintCapacity);

        p2SprintCapacity = new SprintCapacity();
        p2SprintCapacity.userId = user5._id;
        p2SprintCapacity.userDisplayName = user5.displayName();
        p2SprintCapacity.sprintId = p2sprint2._id;
        p2SprintCapacity.daysOff = 9;
        p2SprintCapacity.capacityPerDay = 8;
        p2sprint2.sprintCapacity.push(p2SprintCapacity);
        // END CREATE SPRINTCAPACITYS


        //
        // CREATE SPRINTCAPACITYS
        //
        //Sprint 1
        /*
         var p2SprintRetrospective = new SprintRetrospective();
         p2SprintRetrospective.userId = user1._id;
         p2SprintRetrospective.userDisplayName = user1.displayName();
         p2SprintRetrospective.comment = "Ist sehr Zuverlässig";
         p2sprint1.retrospective.push(p2SprintRetrospective);
         //Sprint 2
         p2SprintRetrospective = new SprintRetrospective();
         p2SprintRetrospective.userId = user2._id;
         p2SprintRetrospective.userDisplayName = user2.displayName();
         p2SprintRetrospective.comment = "Ist sehr Zuverlässig";
         p2sprint2.retrospective.push(p2SprintRetrospective);
         */
        // END CREATE SPRINTCAPACITYS

        //
        // CREATE BURNDOWNMESURE
        //
        /*
         var sprintBurnDownMesure1 = new SprintBurnDownMeasure;
         sprintBurnDownMesure1.dateOfMeasurement = moment().add(180, 'days');
         sprintBurnDownMesure1.remainingWorkTillNow = 40;
         sprint1.sprintBurnDownMeasures.push(sprintBurnDownMesure1);

         var sprintBurnDownMesure2 = new SprintBurnDownMeasure;
         sprintBurnDownMesure2.dateOfMeasurement = moment().add(180, 'days');
         sprintBurnDownMesure2.remainingWorkTillNow = 30;
         sprint1.sprintBurnDownMeasures.push(sprintBurnDownMesure2);


         var sprintBurnDownMesure3 = new SprintBurnDownMeasure;
         sprintBurnDownMesure3.dateOfMeasurement = moment().add(180, 'days');
         sprintBurnDownMesure3.remainingWorkTillNow = 20;
         sprint1.sprintBurnDownMeasures.push(sprintBurnDownMesure3);
         */

        //Sprint 1
        var p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-16";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 65;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-17";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 60;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-18";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 53;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-19";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 53;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-20";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 48;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-21";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 42;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-22";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 38;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-02-23";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 34;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-02-24";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 30;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-25";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 26;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-26";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 22;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-27";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 15;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-28";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 10;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-29";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 6;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-30";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 2;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);

        p2s1sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s1sprintBurnDownMesure.dateOfMeasurement = "2017-01-31";
        p2s1sprintBurnDownMesure.remainingWorkTillNow = 0;
        p2sprint1.sprintBurnDownMeasures.push(p2s1sprintBurnDownMesure);


        //Sprint 2
        var p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-01";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 31;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-02";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 29;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-03";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 28;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-04";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 29;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-05";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 26;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-06";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 24;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-07";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 23;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-08";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 22;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-09";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 21;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);

        p2s2sprintBurnDownMesure = new SprintBurnDownMeasure;
        p2s2sprintBurnDownMesure.dateOfMeasurement = "2017-02-10";
        p2s2sprintBurnDownMesure.remainingWorkTillNow = 20;
        p2sprint2.sprintBurnDownMeasures.push(p2s2sprintBurnDownMesure);
        // ENDCREATE BURNDOWNMESURE


        //
        // CREATE USERSTORIESs
        //
        /*
         for (var i = 1; i <= 30; i++) {
         var p1UserStory = new UserStory();
         p1UserStory.role = "Anwender";
         p1UserStory.feature = "das etwas #";
         p1UserStory.benefit = "Zeit zu sparen";
         p1UserStory.authorId = (i % 2 == 0 ? user1._id : user3._id);
         p1UserStory.authorDisplayName = (i % 2 == 0 ? user1.displayName() : user3.displayName());
         p1UserStory.creationDate = Date.now();
         p1UserStory.complete = false;
         project1.userStories.push(p1UserStory);
         }
         */

        var p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "mich Registrieren und Einloggen können";
        p2UserStory.benefit = "mich vor anderen Benutzern zu unterscheiden";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = true;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "ich mehrere Projekte anlegen und verwalten können";
        p2UserStory.benefit = "mehrere Projekte gleichzeitig verwalten zu können";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = true;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "Product Backlog (inkl. User Story Capture) anlegen und verwalten können";
        p2UserStory.benefit = "das Projekt besser verwalten zu können";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = true;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "Sprint Planning / Review / Retrospective anlegen und verwalten können";
        p2UserStory.benefit = "das Projekt besser verwalten zu können";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = false;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "ein SCRUM Board sehen";
        p2UserStory.benefit = "das einen besseren Überblick über die Backlogeinträge zu haben";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = true;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "Effort Estimation (Planning Poker) durchführen";
        p2UserStory.benefit = "bei der Aufwandsschätzung unterstützt zu werden";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = false;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "ein Burn-Down-Chart haben";
        p2UserStory.benefit = "das Projekt besser verwalten zu können";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = false;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "eine Roadmap haben";
        p2UserStory.benefit = "das Projekt besser verwalten zu können";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = false;
        project2.userStories.push(p2UserStory);

        p2UserStory = new UserStory();
        p2UserStory.role = "Benutzer";
        p2UserStory.feature = "Beispieldaten zur Demonstration haben";
        p2UserStory.benefit = "die mich mit der Funktionsweise des Tools vertraut zu machen";
        p2UserStory.authorId = (user6._id);
        p2UserStory.authorDisplayName = (user6.displayName());
        p2UserStory.creationDate = Date.now();
        p2UserStory.complete = false;
        project2.userStories.push(p2UserStory);
        // END CREATE USERSTORIESs


        //
        // CREATE BACKLOG ITEMS
        //
        //Sprint 1
        var p2BacklogItem = new BacklogItem();
        p2BacklogItem.title = "Projekt CRUD";
        p2BacklogItem.authorId = user1._id;
        p2BacklogItem.authorDisplayName = user1.displayName();
        p2BacklogItem.creationDate = Date.now();
        p2BacklogItem.assignedToId = user1._id;
        p2BacklogItem.assignedToDisplayName = user1.displayName();
        p2BacklogItem.state = "Done";
        p2BacklogItem.priority = "High";
        p2BacklogItem.effort = 2;
        //p2BacklogItem.description = "";
        p2BacklogItem.sprintId = p2sprint1._id;
        p2BacklogItem.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem.projectId = project2._id;
        p2BacklogItem.projectDisplayTitle = project2.displayName;
        p2BacklogItem.userStoryId = project2.userStories[1]._id;
        //p2BacklogItem.userStoryDisplayName =
        p2BacklogItem.itemType = "BacklogItem";
        p2BacklogItem.save();

        var p2BacklogItem2 = new BacklogItem();
        p2BacklogItem2.title = "User Story CRUD";
        p2BacklogItem2.authorId = user1._id;
        p2BacklogItem2.authorDisplayName = user1.displayName();
        p2BacklogItem2.creationDate = Date.now();
        p2BacklogItem2.assignedToId = user4._id;
        p2BacklogItem2.assignedToDisplayName = user4.displayName();
        p2BacklogItem2.state = "Done";
        p2BacklogItem2.priority = "High";
        p2BacklogItem2.effort = 2;
        p2BacklogItem2.sprintId = p2sprint1._id;
        p2BacklogItem2.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem2.projectId = project2._id;
        p2BacklogItem2.projectDisplayTitle = project2.displayName;
        p2BacklogItem2.userStoryId = project2.userStories[2]._id;
        p2BacklogItem2.itemType = "BacklogItem";
        p2BacklogItem2.save();

        var p2BacklogItem3 = new BacklogItem();
        p2BacklogItem3.title = "User Stories als Dokument in Projekt einbetten";
        p2BacklogItem3.authorId = user1._id;
        p2BacklogItem3.authorDisplayName = user1.displayName();
        p2BacklogItem3.creationDate = Date.now();
        p2BacklogItem3.assignedToId = user4._id;
        p2BacklogItem3.assignedToDisplayName = user4.displayName();
        p2BacklogItem3.state = "Done";
        p2BacklogItem3.priority = "Normal";
        p2BacklogItem3.effort = 4;
        p2BacklogItem3.sprintId = p2sprint1._id;
        p2BacklogItem3.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem3.projectId = project2._id;
        p2BacklogItem3.projectDisplayTitle = project2.displayName;
        p2BacklogItem3.userStoryId = project2.userStories[2]._id;
        p2BacklogItem3.itemType = "BacklogItem";
        p2BacklogItem3.save();

        var p2BacklogItem4 = new BacklogItem();
        p2BacklogItem4.title = "UserStory Liste aktualisiert nach dem Löschen einer UserStory nicht neu";
        p2BacklogItem4.authorId = user1._id;
        p2BacklogItem4.authorDisplayName = user1.displayName();
        p2BacklogItem4.creationDate = Date.now();
        p2BacklogItem4.assignedToId = user3._id;
        p2BacklogItem4.assignedToDisplayName = user3.displayName();
        p2BacklogItem4.state = "Done";
        p2BacklogItem4.priority = "Normal";
        p2BacklogItem4.effort = 1;
        p2BacklogItem4.sprintId = p2sprint1._id;
        p2BacklogItem4.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem4.projectId = project2._id;
        p2BacklogItem4.projectDisplayTitle = project2.displayName;
        p2BacklogItem4.userStoryId = project2.userStories[2]._id;
        p2BacklogItem4.itemType = "Bug";
        p2BacklogItem4.save();

        var p2BacklogItem5 = new BacklogItem();
        p2BacklogItem5.title = "get auf .../userstories liefert keine userId (o.ä.) mit";
        p2BacklogItem5.authorId = user1._id;
        p2BacklogItem5.authorDisplayName = user1.displayName();
        p2BacklogItem5.creationDate = Date.now();
        p2BacklogItem5.assignedToId = user3._id;
        p2BacklogItem5.assignedToDisplayName = user3.displayName();
        p2BacklogItem5.state = "Done";
        p2BacklogItem5.priority = "Normal";
        p2BacklogItem5.effort = 1;
        p2BacklogItem5.sprintId = p2sprint1._id;
        p2BacklogItem5.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem5.projectId = project2._id;
        p2BacklogItem5.projectDisplayTitle = project2.displayName;
        p2BacklogItem5.userStoryId = project2.userStories[2]._id;
        p2BacklogItem5.itemType = "Bug";
        p2BacklogItem5.save();

        var p2BacklogItem6 = new BacklogItem();
        p2BacklogItem6.title = "When a UserStory is posted to the Server, the Server says there is no authorID and there was no state set";
        p2BacklogItem6.authorId = user1._id;
        p2BacklogItem6.authorDisplayName = user1.displayName();
        p2BacklogItem6.creationDate = Date.now();
        p2BacklogItem6.assignedToId = user3._id;
        p2BacklogItem6.assignedToDisplayName = user3.displayName();
        p2BacklogItem6.state = "Done";
        p2BacklogItem6.priority = "Normal";
        p2BacklogItem6.effort = 1;
        p2BacklogItem6.sprintId = p2sprint1._id;
        p2BacklogItem6.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem6.projectId = project2._id;
        p2BacklogItem6.projectDisplayTitle = project2.displayName;
        p2BacklogItem6.userStoryId = project2.userStories[2]._id;
        p2BacklogItem6.itemType = "Bug";
        p2BacklogItem6.save();

        var p2BacklogItem7 = new BacklogItem();
        p2BacklogItem7.title = "When Posting a Backlogitem to the Server, the Server is crashing";
        p2BacklogItem7.authorId = user1._id;
        p2BacklogItem7.authorDisplayName = user1.displayName();
        p2BacklogItem7.creationDate = Date.now();
        p2BacklogItem7.assignedToId = user1._id;
        p2BacklogItem7.assignedToDisplayName = user1.displayName();
        p2BacklogItem7.state = "Done";
        p2BacklogItem7.priority = "Normal";
        p2BacklogItem7.effort = 1;
        p2BacklogItem7.sprintId = p2sprint1._id;
        p2BacklogItem7.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem7.projectId = project2._id;
        p2BacklogItem7.projectDisplayTitle = project2.displayName;
        p2BacklogItem7.userStoryId = project2.userStories[2]._id;
        p2BacklogItem7.itemType = "Bug";
        p2BacklogItem7.save();

        var p2BacklogItem8 = new BacklogItem();
        p2BacklogItem8.title = "Sprint CRUD";
        p2BacklogItem8.authorId = user1._id;
        p2BacklogItem8.authorDisplayName = user1.displayName();
        p2BacklogItem8.creationDate = Date.now();
        p2BacklogItem8.assignedToId = user5._id;
        p2BacklogItem8.assignedToDisplayName = user5.displayName();
        p2BacklogItem8.state = "Done";
        p2BacklogItem8.priority = "Normal";
        p2BacklogItem8.effort = 2;
        p2BacklogItem8.sprintId = p2sprint1._id;
        p2BacklogItem8.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem8.projectId = project2._id;
        p2BacklogItem8.projectDisplayTitle = project2.displayName;
        p2BacklogItem8.userStoryId = project2.userStories[3]._id;
        p2BacklogItem8.itemType = "BacklogItem";
        p2BacklogItem8.save();

        var p2BacklogItem9 = new BacklogItem();
        p2BacklogItem9.title = "Projektauswahl UI";
        p2BacklogItem9.authorId = user1._id;
        p2BacklogItem9.authorDisplayName = user1.displayName();
        p2BacklogItem9.creationDate = Date.now();
        p2BacklogItem9.assignedToId = user1._id;
        p2BacklogItem9.assignedToDisplayName = user1.displayName();
        p2BacklogItem9.state = "Done";
        p2BacklogItem9.priority = "Normal";
        p2BacklogItem9.effort = 3;
        p2BacklogItem9.sprintId = p2sprint1._id;
        p2BacklogItem9.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem9.projectId = project2._id;
        p2BacklogItem9.projectDisplayTitle = project2.displayName;
        p2BacklogItem9.userStoryId = project2.userStories[1]._id;
        p2BacklogItem9.itemType = "BacklogItem";
        p2BacklogItem9.save();

        var p2BacklogItem10 = new BacklogItem();
        p2BacklogItem10.title = "Login/Logout, Registrierung UI";
        p2BacklogItem10.authorId = user1._id;
        p2BacklogItem10.authorDisplayName = user1.displayName();
        p2BacklogItem10.creationDate = Date.now();
        p2BacklogItem10.assignedToId = user5._id;
        p2BacklogItem10.assignedToDisplayName = user5.displayName();
        p2BacklogItem10.state = "Done";
        p2BacklogItem10.priority = "Normal";
        p2BacklogItem10.effort = 3;
        p2BacklogItem10.sprintId = p2sprint1._id;
        p2BacklogItem10.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem10.projectId = project2._id;
        p2BacklogItem10.projectDisplayTitle = project2.displayName;
        p2BacklogItem10.userStoryId = project2.userStories[0]._id;
        p2BacklogItem10.itemType = "BacklogItem";
        p2BacklogItem10.save();

        var p2BacklogItem11 = new BacklogItem();
        p2BacklogItem11.title = "Benutzerdaten CRUD";
        p2BacklogItem11.authorId = user1._id;
        p2BacklogItem11.authorDisplayName = user1.displayName();
        p2BacklogItem11.creationDate = Date.now();
        p2BacklogItem11.assignedToId = user2._id;
        p2BacklogItem11.assignedToDisplayName = user2.displayName();
        p2BacklogItem11.state = "Done";
        p2BacklogItem11.priority = "Normal";
        p2BacklogItem11.effort = 2;
        p2BacklogItem11.sprintId = p2sprint1._id;
        p2BacklogItem11.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem11.projectId = project2._id;
        p2BacklogItem11.projectDisplayTitle = project2.displayName;
        p2BacklogItem11.userStoryId = project2.userStories[0]._id;
        p2BacklogItem11.itemType = "BacklogItem";
        p2BacklogItem11.save();

        var p2BacklogItem12 = new BacklogItem();
        p2BacklogItem12.title = "Login/Logout";
        p2BacklogItem12.authorId = user1._id;
        p2BacklogItem12.authorDisplayName = user1.displayName();
        p2BacklogItem12.creationDate = Date.now();
        p2BacklogItem12.assignedToId = user3._id;
        p2BacklogItem12.assignedToDisplayName = user3.displayName();
        p2BacklogItem12.state = "Done";
        p2BacklogItem12.priority = "Normal";
        p2BacklogItem12.effort = 5;
        p2BacklogItem12.sprintId = p2sprint1._id;
        p2BacklogItem12.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem12.projectId = project2._id;
        p2BacklogItem12.projectDisplayTitle = project2.displayName;
        p2BacklogItem12.userStoryId = project2.userStories[0]._id;
        p2BacklogItem12.itemType = "BacklogItem";
        p2BacklogItem12.save();

        var p2BacklogItem13 = new BacklogItem();
        p2BacklogItem13.title = "UserStory Edit UI";
        p2BacklogItem13.authorId = user1._id;
        p2BacklogItem13.authorDisplayName = user1.displayName();
        p2BacklogItem13.creationDate = Date.now();
        p2BacklogItem13.assignedToId = user3._id;
        p2BacklogItem13.assignedToDisplayName = user3.displayName();
        p2BacklogItem13.state = "Done";
        p2BacklogItem13.priority = "Normal";
        p2BacklogItem13.effort = 3;
        p2BacklogItem13.sprintId = p2sprint1._id;
        p2BacklogItem13.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem13.projectId = project2._id;
        p2BacklogItem13.projectDisplayTitle = project2.displayName;
        p2BacklogItem13.userStoryId = project2.userStories[2]._id;
        p2BacklogItem13.itemType = "BacklogItem";
        p2BacklogItem13.save();

        var p2BacklogItem14 = new BacklogItem();
        p2BacklogItem14.title = "User Story UI";
        p2BacklogItem14.authorId = user1._id;
        p2BacklogItem14.authorDisplayName = user1.displayName();
        p2BacklogItem14.creationDate = Date.now();
        p2BacklogItem14.assignedToId = user3._id;
        p2BacklogItem14.assignedToDisplayName = user3.displayName();
        p2BacklogItem14.state = "Done";
        p2BacklogItem14.priority = "Normal";
        p2BacklogItem14.effort = 3;
        p2BacklogItem14.sprintId = p2sprint1._id;
        p2BacklogItem14.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem14.projectId = project2._id;
        p2BacklogItem14.projectDisplayTitle = project2.displayName;
        p2BacklogItem14.userStoryId = project2.userStories[2]._id;
        p2BacklogItem14.itemType = "BacklogItem";
        p2BacklogItem14.save();

        var p2BacklogItem15 = new BacklogItem();
        p2BacklogItem15.title = "Welcome UI-Flow";
        p2BacklogItem15.authorId = user1._id;
        p2BacklogItem15.authorDisplayName = user1.displayName();
        p2BacklogItem15.creationDate = Date.now();
        p2BacklogItem15.assignedToId = user4._id;
        p2BacklogItem15.assignedToDisplayName = user4.displayName();
        p2BacklogItem15.state = "Done";
        p2BacklogItem15.priority = "Normal";
        p2BacklogItem15.effort = 3;
        p2BacklogItem15.sprintId = p2sprint1._id;
        p2BacklogItem15.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem15.projectId = project2._id;
        p2BacklogItem15.projectDisplayTitle = project2.displayName;
        p2BacklogItem15.userStoryId = project2.userStories[0]._id;
        p2BacklogItem15.itemType = "BacklogItem";
        p2BacklogItem15.save();

        var p2BacklogItem16 = new BacklogItem();
        p2BacklogItem16.title = "Sprint CRUD UI";
        p2BacklogItem16.authorId = user1._id;
        p2BacklogItem16.authorDisplayName = user1.displayName();
        p2BacklogItem16.creationDate = Date.now();
        p2BacklogItem16.assignedToId = user2._id;
        p2BacklogItem16.assignedToDisplayName = user2.displayName();
        p2BacklogItem16.state = "Done";
        p2BacklogItem16.priority = "Normal";
        p2BacklogItem16.effort = 3;
        p2BacklogItem16.sprintId = p2sprint1._id;
        p2BacklogItem16.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem16.projectId = project2._id;
        p2BacklogItem16.projectDisplayTitle = project2.displayName;
        p2BacklogItem16.userStoryId = project2.userStories[3]._id;
        p2BacklogItem16.itemType = "BacklogItem";
        p2BacklogItem16.save();

        var p2BacklogItem17 = new BacklogItem();
        p2BacklogItem17.title = "Projektanzeige in der Navigationsleiste";
        p2BacklogItem17.authorId = user1._id;
        p2BacklogItem17.authorDisplayName = user1.displayName();
        p2BacklogItem17.creationDate = Date.now();
        p2BacklogItem17.assignedToId = user1._id;
        p2BacklogItem17.assignedToDisplayName = user1.displayName();
        p2BacklogItem17.state = "Done";
        p2BacklogItem17.priority = "Normal";
        p2BacklogItem17.effort = 8;
        p2BacklogItem17.sprintId = p2sprint1._id;
        p2BacklogItem17.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem17.projectId = project2._id;
        p2BacklogItem17.projectDisplayTitle = project2.displayName;
        p2BacklogItem17.userStoryId = project2.userStories[1]._id;
        p2BacklogItem17.itemType = "BacklogItem";
        p2BacklogItem17.save();

        var p2BacklogItem18 = new BacklogItem();
        p2BacklogItem18.title = "Kanban Board";
        p2BacklogItem18.authorId = user1._id;
        p2BacklogItem18.authorDisplayName = user1.displayName();
        p2BacklogItem18.creationDate = Date.now();
        p2BacklogItem18.assignedToId = user5._id;
        p2BacklogItem18.assignedToDisplayName = user5.displayName();
        p2BacklogItem18.state = "Done";
        p2BacklogItem18.priority = "Normal";
        p2BacklogItem18.effort = 13;
        p2BacklogItem18.sprintId = p2sprint1._id;
        p2BacklogItem18.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem18.projectId = project2._id;
        p2BacklogItem18.projectDisplayTitle = project2.displayName;
        p2BacklogItem18.userStoryId = project2.userStories[4]._id;
        p2BacklogItem18.itemType = "BacklogItem";
        p2BacklogItem18.save();

        var p2BacklogItem19 = new BacklogItem();
        p2BacklogItem19.title = "Task CRUD";
        p2BacklogItem19.authorId = user1._id;
        p2BacklogItem19.authorDisplayName = user1.displayName();
        p2BacklogItem19.creationDate = Date.now();
        p2BacklogItem19.assignedToId = user1._id;
        p2BacklogItem19.assignedToDisplayName = user1.displayName();
        p2BacklogItem19.state = "Done";
        p2BacklogItem19.priority = "Normal";
        p2BacklogItem19.effort = 2;
        p2BacklogItem19.sprintId = p2sprint1._id;
        p2BacklogItem19.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem19.projectId = project2._id;
        p2BacklogItem19.projectDisplayTitle = project2.displayName;
        p2BacklogItem19.userStoryId = project2.userStories[2]._id;
        p2BacklogItem19.itemType = "BacklogItem";
        p2BacklogItem19.save();

        var p2BacklogItem20 = new BacklogItem();
        p2BacklogItem20.title = "BacklogItem UI";
        p2BacklogItem20.authorId = user2._id;
        p2BacklogItem20.authorDisplayName = user2.displayName();
        p2BacklogItem20.creationDate = Date.now();
        p2BacklogItem20.assignedToId = user1._id;
        p2BacklogItem20.assignedToDisplayName = user1.displayName();
        p2BacklogItem20.state = "Done";
        p2BacklogItem20.priority = "Normal";
        p2BacklogItem20.effort = 3;
        p2BacklogItem20.sprintId = p2sprint1._id;
        p2BacklogItem20.sprintDisplayName = p2sprint1.sprintName;
        p2BacklogItem20.projectId = project2._id;
        p2BacklogItem20.projectDisplayTitle = project2.displayName;
        p2BacklogItem20.userStoryId = project2.userStories[2]._id;
        p2BacklogItem20.itemType = "BacklogItem";
        p2BacklogItem20.save();

        //Sprint 2
        var p2BacklogItem21 = new BacklogItem();
        p2BacklogItem21.title = "Planning Poker UI";
        p2BacklogItem21.authorId = user1._id;
        p2BacklogItem21.authorDisplayName = user1.displayName();
        p2BacklogItem21.creationDate = Date.now();
        p2BacklogItem21.assignedToId = user4._id;
        p2BacklogItem21.assignedToDisplayName = user4.displayName();
        p2BacklogItem21.state = "Committed";
        p2BacklogItem21.priority = "Normal";
        p2BacklogItem21.effort = 3;
        p2BacklogItem21.sprintId = p2sprint2._id;
        p2BacklogItem21.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem21.projectId = project2._id;
        p2BacklogItem21.projectDisplayTitle = project2.displayName;
        p2BacklogItem21.userStoryId = project2.userStories[5]._id;
        p2BacklogItem21.itemType = "BacklogItem";
        p2BacklogItem21.save();

        var p2BacklogItem22 = new BacklogItem();
        p2BacklogItem22.title = "Planning Poker CRUD";
        p2BacklogItem22.authorId = user1._id;
        p2BacklogItem22.authorDisplayName = user1.displayName();
        p2BacklogItem22.creationDate = Date.now();
        p2BacklogItem22.assignedToId = user4._id;
        p2BacklogItem22.assignedToDisplayName = user4.displayName();
        p2BacklogItem22.state = "Committed";
        p2BacklogItem22.priority = "Normal";
        p2BacklogItem22.effort = 6;
        p2BacklogItem22.sprintId = p2sprint2._id;
        p2BacklogItem22.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem22.projectId = project2._id;
        p2BacklogItem22.projectDisplayTitle = project2.displayName;
        p2BacklogItem22.userStoryId = project2.userStories[5]._id;
        p2BacklogItem22.itemType = "BacklogItem";
        p2BacklogItem22.save();

        var p2BacklogItem23 = new BacklogItem();
        p2BacklogItem23.title = "Sprint<>BacklogItem CRUD";
        p2BacklogItem23.authorId = user1._id;
        p2BacklogItem23.authorDisplayName = user1.displayName();
        p2BacklogItem23.creationDate = Date.now();
        p2BacklogItem23.assignedToId = user5._id;
        p2BacklogItem23.assignedToDisplayName = user5.displayName();
        p2BacklogItem23.state = "Done";
        p2BacklogItem23.priority = "Approved";
        p2BacklogItem23.effort = 7;
        p2BacklogItem23.sprintId = p2sprint2._id;
        p2BacklogItem23.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem23.projectId = project2._id;
        p2BacklogItem23.projectDisplayTitle = project2.displayName;
        p2BacklogItem23.userStoryId = project2.userStories[3]._id;
        p2BacklogItem23.itemType = "BacklogItem";
        p2BacklogItem23.save();

        var p2BacklogItem24 = new BacklogItem();
        p2BacklogItem24.title = "Burn-Down-Chart";
        p2BacklogItem24.authorId = user1._id;
        p2BacklogItem24.authorDisplayName = user1.displayName();
        p2BacklogItem24.creationDate = Date.now();
        p2BacklogItem24.assignedToId = user2._id;
        p2BacklogItem24.assignedToDisplayName = user2.displayName();
        p2BacklogItem24.state = "Approved";
        p2BacklogItem24.priority = "Normal";
        p2BacklogItem24.effort = 10;
        p2BacklogItem24.sprintId = p2sprint2._id;
        p2BacklogItem24.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem24.projectId = project2._id;
        p2BacklogItem24.projectDisplayTitle = project2.displayName;
        p2BacklogItem24.userStoryId = project2.userStories[6]._id;
        p2BacklogItem24.itemType = "BacklogItem";
        p2BacklogItem24.save();

        var p2BacklogItem25 = new BacklogItem();
        p2BacklogItem25.title = "Product Owner soll eine Retrospektive erstellen können, wo jeder Mitarbeiter die positiven und negativen Erfahrungen mitteilen soll";
        p2BacklogItem25.authorId = user1._id;
        p2BacklogItem25.authorDisplayName = user1.displayName();
        p2BacklogItem25.creationDate = Date.now();
        p2BacklogItem25.assignedToId = user3._id;
        p2BacklogItem25.assignedToDisplayName = user3.displayName();
        p2BacklogItem25.state = "New";
        p2BacklogItem25.priority = "Normal";
        p2BacklogItem25.effort = 1;
        p2BacklogItem25.sprintId = p2sprint2._id;
        p2BacklogItem25.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem25.projectId = project2._id;
        p2BacklogItem25.projectDisplayTitle = project2.displayName;
        p2BacklogItem25.userStoryId = project2.userStories[3]._id;
        p2BacklogItem25.itemType = "BacklogItem";
        p2BacklogItem25.save();

        var p2BacklogItem26 = new BacklogItem();
        p2BacklogItem26.title = "Diagramm UI";
        p2BacklogItem26.authorId = user1._id;
        p2BacklogItem26.authorDisplayName = user1.displayName();
        p2BacklogItem26.creationDate = Date.now();
        p2BacklogItem26.assignedToId = user4._id;
        p2BacklogItem26.assignedToDisplayName = user4.displayName();
        p2BacklogItem26.state = "Approved";
        p2BacklogItem26.priority = "Normal";
        p2BacklogItem26.effort = 3;
        p2BacklogItem26.sprintId = p2sprint2._id;
        p2BacklogItem26.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem26.projectId = project2._id;
        p2BacklogItem26.projectDisplayTitle = project2.displayName;
        p2BacklogItem26.userStoryId = project2.userStories[6]._id;
        p2BacklogItem26.itemType = "BacklogItem";
        p2BacklogItem26.save();

        var p2BacklogItem27 = new BacklogItem();
        p2BacklogItem27.title = "Testdatengenerator";
        p2BacklogItem27.authorId = user1._id;
        p2BacklogItem27.authorDisplayName = user5.displayName();
        p2BacklogItem27.creationDate = Date.now();
        p2BacklogItem27.assignedToId = user5._id;
        p2BacklogItem27.assignedToDisplayName = user1.displayName();
        p2BacklogItem27.state = "New";
        p2BacklogItem27.priority = "Normal";
        p2BacklogItem27.effort = 1;
        p2BacklogItem27.sprintId = p2sprint2._id;
        p2BacklogItem27.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem27.projectId = project2._id;
        p2BacklogItem27.projectDisplayTitle = project2.displayName;
        p2BacklogItem27.userStoryId = project2.userStories[8]._id;
        p2BacklogItem27.itemType = "BacklogItem";
        p2BacklogItem27.save();

        var p2BacklogItem28 = new BacklogItem();
        p2BacklogItem28.title = "Fallstudie mit Testdaten erstellen";
        p2BacklogItem28.authorId = user1._id;
        p2BacklogItem28.authorDisplayName = user1.displayName();
        p2BacklogItem28.creationDate = Date.now();
        p2BacklogItem28.assignedToId = user5._id;
        p2BacklogItem28.assignedToDisplayName = user5.displayName();
        p2BacklogItem28.state = "New";
        p2BacklogItem28.priority = "Normal";
        p2BacklogItem28.effort = 1;
        p2BacklogItem28.sprintId = p2sprint2._id;
        p2BacklogItem28.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem28.projectId = project2._id;
        p2BacklogItem28.projectDisplayTitle = project2.displayName;
        p2BacklogItem28.userStoryId = project2.userStories[8]._id;
        p2BacklogItem28.itemType = "BacklogItem";
        p2BacklogItem28.save();

        var p2BacklogItem29 = new BacklogItem();
        p2BacklogItem29.title = "Feature Item CRUD";
        p2BacklogItem29.authorId = user1._id;
        p2BacklogItem29.authorDisplayName = user1.displayName();
        p2BacklogItem29.creationDate = Date.now();
        p2BacklogItem29.assignedToId = user1._id;
        p2BacklogItem29.assignedToDisplayName = user1.displayName();
        p2BacklogItem29.state = "Committed";
        p2BacklogItem29.priority = "Normal";
        p2BacklogItem29.effort = 2;
        p2BacklogItem29.sprintId = p2sprint2._id;
        p2BacklogItem29.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem29.projectId = project2._id;
        p2BacklogItem29.projectDisplayTitle = project2.displayName;
        p2BacklogItem29.userStoryId = project2.userStories[7]._id;
        p2BacklogItem29.itemType = "BacklogItem";
        p2BacklogItem29.save();

        var p2BacklogItem30 = new BacklogItem();
        p2BacklogItem30.title = "Roadmap Item CRUD";
        p2BacklogItem30.authorId = user1._id;
        p2BacklogItem30.authorDisplayName = user1.displayName();
        p2BacklogItem30.creationDate = Date.now();
        p2BacklogItem30.assignedToId = user3._id;
        p2BacklogItem30.assignedToDisplayName = user3.displayName();
        p2BacklogItem30.state = "Approved";
        p2BacklogItem30.priority = "Normal";
        p2BacklogItem30.effort = 2;
        p2BacklogItem30.sprintId = p2sprint2._id;
        p2BacklogItem30.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem30.projectId = project2._id;
        p2BacklogItem30.projectDisplayTitle = project2.displayName;
        p2BacklogItem30.userStoryId = project2.userStories[7]._id;
        p2BacklogItem30.itemType = "BacklogItem";
        p2BacklogItem30.save();

        var p2BacklogItem31 = new BacklogItem();
        p2BacklogItem31.title = "getSprints gibt nicht passendes JSON zurück";
        p2BacklogItem31.authorId = user1._id;
        p2BacklogItem31.authorDisplayName = user1.displayName();
        p2BacklogItem31.creationDate = Date.now();
        p2BacklogItem31.assignedToId = user2._id;
        p2BacklogItem31.assignedToDisplayName = user2.displayName();
        p2BacklogItem31.state = "Approved";
        p2BacklogItem31.priority = "Normal";
        p2BacklogItem31.effort = 1;
        p2BacklogItem31.sprintId = p2sprint2._id;
        p2BacklogItem31.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem31.projectId = project2._id;
        p2BacklogItem31.projectDisplayTitle = project2.displayName;
        p2BacklogItem31.userStoryId = project2.userStories[3]._id;
        p2BacklogItem31.itemType = "Bug";
        p2BacklogItem31.save();

        var p2BacklogItem32 = new BacklogItem();
        p2BacklogItem32.title = "Beim löschen eines Backlogitems zeigt das Frontend eine Fehlermeldung. Es scheint als würde der Response des Server nicht korrekt zu sein";
        p2BacklogItem32.authorId = user1._id;
        p2BacklogItem32.authorDisplayName = user1.displayName();
        p2BacklogItem32.creationDate = Date.now();
        p2BacklogItem32.assignedToId = user1._id;
        p2BacklogItem32.assignedToDisplayName = user1.displayName();
        p2BacklogItem32.state = "New";
        p2BacklogItem32.priority = "Normal";
        p2BacklogItem32.effort = 1;
        p2BacklogItem32.sprintId = p2sprint2._id;
        p2BacklogItem32.sprintDisplayName = p2sprint2.sprintName;
        p2BacklogItem32.projectId = project2._id;
        p2BacklogItem32.projectDisplayTitle = project2.displayName;
        p2BacklogItem32.userStoryId = project2.userStories[2]._id;
        p2BacklogItem32.itemType = "Bug";
        p2BacklogItem32.save();
        // END CREATE BACKLOG ITEMS


        //
        // CREATE INITIATIVES


        var descs = [
            'Coloring book dreamcatcher meh, la croix mlkshk williamsburg iPhone squid cliche hoodie vexillologist cray. Glossier activated charcoal venmo raclette. Crucifix taxidermy sustainable post-ironic, etsy freegan pok pok echo park tumblr pour-over gastropub scenester poke salvia celiac. YOLO cred direct trade, irony synth tattooed ennui meggings chia.'
            , 'Lo-fi fingerstache normcore, hella shabby chic vegan roof party small batch tilde marfa bespoke slow-carb chambray cray cred. Deep v man braid etsy, everyday carry XOXO meh tbh microdosing air plant fam. Quinoa williamsburg post-ironic, thundercats intelligentsia yr pour-over.'
            , 'Fingerstache hammock austin tousled cliche, occupy vinyl. Pop-up tilde hoodie, skateboard tousled brooklyn try-hard scenester hexagon. Fanny pack shoreditch XOXO vexillologist jean shorts, gochujang heirloom brooklyn umami. Migas 3 wolf moon next level iceland brooklyn, bitters pour-over. Asymmetrical dreamcatcher street art trust fund.'
            , 'Single-origin coffee chillwave readymade mixtape, pabst vice literally austin cronut meditation fingerstache echo park snackwave kitsch. Kickstarter mustache flexitarian echo park, photo booth edison bulb subway tile street art PBR&B.'
            , 'Swag actually trust fund, messenger bag blog selfies mumblecore +1 whatever freegan kombucha leggings kinfolk. Succulents cardigan sustainable iPhone tacos. Kombucha ethical listicle blue bottle pok pok fanny pack, try-hard marfa quinoa offal. Butcher swag leggings woke wolf farm-to-table. IPhone meh slow-carb distillery.'
            , 'Before they sold out chambray brooklyn tofu, tilde flannel portland fam art party cardigan dreamcatcher mustache. Tacos humblebrag wolf, chicharrones kinfolk vegan banh mi offal pork belly sartorial quinoa beard man braid. Pok pok freegan hot chicken gentrify, truffaut artisan vinyl synth direct trade tacos intelligentsia street art vexillologist migas small batch.'
            , 'Truffaut slow-carb 8-bit kale chips. Food truck synth viral, vaporware humblebrag quinoa green juice DIY. Coloring book hot chicken direct trade farm-to-table chillwave, tacos hella cornhole succulents edison bulb. Jianbing tousled VHS hoodie, tofu wayfarers PBR&B fap hot chicken roof party neutra.'
            , 'Chia pour-over offal, shabby chic deep v man braid kale chips schlitz shoreditch activated charcoal. Blog knausgaard helvetica, cardigan unicorn meh yuccie franzen direct trade. Mixtape godard edison bulb authentic retro, selfies cronut art party knausgaard pickled humblebrag slow-carb.'
            , 'Af messenger bag mumblecore man bun marfa craft beer. Gentrify selfies brunch, raclette man bun try-hard plaid etsy franzen hell of leggings butcher organic. Ennui PBR&B disrupt, church-key shabby chic edison bulb man braid drinking vinegar gastropub sartorial banh mi kogi hot chicken distillery semiotics.'
            , 'Venmo lo-fi cronut, enamel pin bicycle rights pok pok vice chartreuse trust fund XOXO flexitarian. Flexitarian etsy keytar ennui, messenger bag portland freegan subway tile. Shoreditch tbh tumblr, iceland yr bushwick tofu organic bespoke readymade butcher before they sold out.'
        ];

        var initiatives = [
            ['Website'                          ,"2016-11-02","2017-01-30", "Online-Nutzung aller Funktionalitäten"],
            ['Mobile Website'                   ,"2017-01-06","2017-02-08", "Nutzung aller Funktionalitäten auf mobilen Endgeräten"],
            ['Umgestaltung User Interface'      ,"2017-02-01","2017-04-02", "Verbesserung der Nutzer-Erfahrung"],
            ['Android Applikation'              ,"2017-02-06","2017-04-16", "Native Nutzung auf mobilen Endgeräten (Android)"],
            ['IOS Applikation'                  ,"2017-03-11","2017-05-21", "Native Nutzung auf mobilen Endgeräten (IOS)"],
            ['Performanceverbesserungen'        ,"2017-05-10","2017-08-09", "Schneller und intuitivere Durchführung von Berechnungen"],
            ['Social Media Integration'         ,"2017-07-22","2017-08-26", "Ansprechen von potenziellen Nutzern"],
            ['Partner Portal'                   ,"2017-08-15","2018-01-11", "Ausweitung auf weitere Branchen"],
            ['Cassandra Migration'              ,"2018-01-04","2018-01-16", "Performance-Verbesserung bei großen Datenmengen"]
        ];

        var initiativeFeatures = [
            ["Planungspoker", "Feature1", "Feature2"],
            ["Feature3", "Feature3", "Feature4"],
            ["Suchfunktion", "Profilverwaltung", "Kommunikation zw. Nutzern"],
            ["Mobile Benachrichtigungen", "Gesicherte Kommunikation", "Feature5"],
            ["Mobile Benachrichtigungen", "Apple Watch Integration", "Feature6"],
            ["Schnellere Suchfunktionalität", "Feature7", "Feature8"],
            ["Schnellere Infos über Updated", "Feedbackfähigkeit", "Kommunikation zu Nutzern"],
            ["Feature9", "Feature10", "Feature11"],
            ["Feature12", "Feature13", "Feature14"]
        ];

        for (var i = 0; i < initiatives.length; i++) {
            var p1Initiative = new Initiative();
            p1Initiative.title = initiatives[i][0];

            startDate = new Date(initiatives[i][1]);
            p1Initiative.startDate = startDate;

            var endDate = new Date(initiatives[i][2]);
            p1Initiative.endDate = endDate;

            p1Initiative.description = descs[i];
            p1Initiative.goal = initiatives[i][3];
            p1Initiative.projectId = project1._id;

            for (var j = 0; j < 3; j++) {
                var p1Feature = new Feature();
                p1Feature.title = initiativeFeatures[i][j];
                p1Initiative.features.push(p1Feature);
            }
            p1Initiative.save();
        }

        for (var i = 0; i < initiatives.length; i++) {
            var p2Initiative = new Initiative();
            p2Initiative.title = initiatives[i][0];

            startDate = new Date(initiatives[i][1]);
            p2Initiative.startDate = startDate;

            var endDate = new Date(initiatives[i][2]);
            p2Initiative.endDate = endDate;

            p2Initiative.description = descs[i];
            p2Initiative.goal = initiatives[i][3];
            p2Initiative.projectId = project2._id;

            for (var j = 0; j < 3; j++) {
                var p2Feature = new Feature();
                p2Feature.title = initiativeFeatures[i][j];
                p2Initiative.features.push(p2Feature);
            }
            p2Initiative.save();
        }

        return res.status(200).send();
    });

module.exports = router;