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
var SprintBurnDownMeasure = mongoose.model('SprintBurnDownMeasure');
var PlanningPoker = mongoose.model('PlanningPoker');

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
        project1.dueDate = moment().add(180, 'days');
        project1.stakeholders.push(user2._id, user3._id);
        project1.contributors.push(user1._id, user2._id);
        project1.save();

        var project2 = new Project();
        project2.displayName = "Taschenrechner";
        project2.description = "Der echte Alleskönner!";
        project2.owner = user2._id;
        project2.dueDate = moment().add(360, 'days');
        project2.stakeholders.push(user1._id, user3._id);
        project2.contributors.push(user1._id, user2._id);
        project2.save();
        // END CREATE USERS


        //
        // CREATE SPRINTS
        //
        var sprint1 = new Sprint();
        sprint1.sprintName = "Sprint 1";
        sprint1.startDate = moment().add(180, 'days');
        sprint1.endDate = moment().add(180, 'days');
        sprint1.projectId(project1);
        sprint1.save();

        var sprint2 = new Sprint();
        sprint2.sprintName = "Sprint 2";
        sprint2.startDate = moment().add(180, 'days');
        sprint2.endDate = moment().add(180, 'days');
        sprint2.projectId(project1);
        sprint2.save();


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



        //
        // CREATE USERSTORIESs
        //
        for (var i = 1; i <= 30; i++) {
            var p1UserStory = new UserStory();
            p1UserStory.title = "Anforderung " + i;
            p1UserStory.authorId = (i % 2 == 0 ? user1._id : user3._id);
            p1UserStory.authorDisplayName = (i % 2 == 0 ? user1.displayName() : user3.displayName());
            p1UserStory.creationDate = Date.now();
            p1UserStory.complete = false;
            project1.userStories.push(p1UserStory);
        }
        for (var i = 1; i <= 30; i++) {
            var p2UserStory = new UserStory();
            p2UserStory.title = "Anforderung " + i;
            p2UserStory.authorId = (i % 2 == 0 ? user1._id : user3._id);
            p2UserStory.authorDisplayName = (i % 2 == 0 ? user1.displayName() : user3.displayName());
            p2UserStory.creationDate = Date.now();
            p2UserStory.complete = false;
            project2.userStories.push(p2UserStory);
        }
        // END CREATE USERS

        //
        // CREATE INITIATIVES


        var descs = [
            'Coloring book dreamcatcher meh, la croix mlkshk williamsburg iPhone squid cliche hoodie vexillologist cray. Glossier activated charcoal venmo raclette. Crucifix taxidermy sustainable post-ironic, etsy freegan pok pok echo park tumblr pour-over gastropub scenester poke salvia celiac. YOLO cred direct trade, irony synth tattooed ennui meggings chia.'
            ,'Lo-fi fingerstache normcore, hella shabby chic vegan roof party small batch tilde marfa bespoke slow-carb chambray cray cred. Deep v man braid etsy, everyday carry XOXO meh tbh microdosing air plant fam. Quinoa williamsburg post-ironic, thundercats intelligentsia yr pour-over.'
            ,'Fingerstache hammock austin tousled cliche, occupy vinyl. Pop-up tilde hoodie, skateboard tousled brooklyn try-hard scenester hexagon. Fanny pack shoreditch XOXO vexillologist jean shorts, gochujang heirloom brooklyn umami. Migas 3 wolf moon next level iceland brooklyn, bitters pour-over. Asymmetrical dreamcatcher street art trust fund.'
            ,'Single-origin coffee chillwave readymade mixtape, pabst vice literally austin cronut meditation fingerstache echo park snackwave kitsch. Kickstarter mustache flexitarian echo park, photo booth edison bulb subway tile street art PBR&B.'
            ,'Swag actually trust fund, messenger bag blog selfies mumblecore +1 whatever freegan kombucha leggings kinfolk. Succulents cardigan sustainable iPhone tacos. Kombucha ethical listicle blue bottle pok pok fanny pack, try-hard marfa quinoa offal. Butcher swag leggings woke wolf farm-to-table. IPhone meh slow-carb distillery.'
            ,'Before they sold out chambray brooklyn tofu, tilde flannel portland fam art party cardigan dreamcatcher mustache. Tacos humblebrag wolf, chicharrones kinfolk vegan banh mi offal pork belly sartorial quinoa beard man braid. Pok pok freegan hot chicken gentrify, truffaut artisan vinyl synth direct trade tacos intelligentsia street art vexillologist migas small batch.'
            ,'Truffaut slow-carb 8-bit kale chips. Food truck synth viral, vaporware humblebrag quinoa green juice DIY. Coloring book hot chicken direct trade farm-to-table chillwave, tacos hella cornhole succulents edison bulb. Jianbing tousled VHS hoodie, tofu wayfarers PBR&B fap hot chicken roof party neutra.'
            ,'Chia pour-over offal, shabby chic deep v man braid kale chips schlitz shoreditch activated charcoal. Blog knausgaard helvetica, cardigan unicorn meh yuccie franzen direct trade. Mixtape godard edison bulb authentic retro, selfies cronut art party knausgaard pickled humblebrag slow-carb.'
            ,'Af messenger bag mumblecore man bun marfa craft beer. Gentrify selfies brunch, raclette man bun try-hard plaid etsy franzen hell of leggings butcher organic. Ennui PBR&B disrupt, church-key shabby chic edison bulb man braid drinking vinegar gastropub sartorial banh mi kogi hot chicken distillery semiotics.'
            ,'Venmo lo-fi cronut, enamel pin bicycle rights pok pok vice chartreuse trust fund XOXO flexitarian. Flexitarian etsy keytar ennui, messenger bag portland freegan subway tile. Shoreditch tbh tumblr, iceland yr bushwick tofu organic bespoke readymade butcher before they sold out.'
        ];


        for (var i = 1; i <= 10; i++) {
            var p1Initiative = new Initiative();
            p1Initiative.title = "Initiative" + i;

            var startDate = moment();
            startDate = startDate.add(5, "days");
            startDate = startDate.subtract(i-1, "days");
            p1Initiative.startDate =  startDate;

            var endDate = moment();
            endDate = endDate.add(35, "days");
            endDate = endDate.subtract(i, "days");
            p1Initiative.endDate = endDate;

            p1Initiative.description = descs[i-1];
            p1Initiative.goal = "Be Awesome! ALWAY!";
            p1Initiative.projectId = project1._id;

            for(var j = 1; j <= 10; j++){
                var p1Feature = new Feature();
                p1Feature.title = "Feature"+ j;
                p1Initiative.features.push(p1Feature);
            }
            p1Initiative.save();
        }

        for (var i = 1; i <= 10; i++) {
            var p2Initiative = new Initiative();
            p2Initiative.title = "Initiative" + i;

            var startDate = moment();
            startDate = startDate.add(5, "days");
            startDate = startDate.subtract(i-1, "days");
            p2Initiative.startDate =  startDate;

            var endDate = moment();
            endDate = endDate.add(35, "days");
            endDate = endDate.subtract(i, "days");
            p2Initiative.endDate = endDate;

            p2Initiative.description = descs[i-1];
            p2Initiative.goal = "Be Awesome! ALWAY!";
            p2Initiative.projectId = project2._id;

            for(var j = 1; j <= 10; j++){
                var p2Feature = new Feature();
                p2Feature.title = "Feature"+ j;
                p2Initiative.features.push(p2Feature);
            }
            p2Initiative.save();
        }

        return res.status(200).send();
    });

module.exports = router;