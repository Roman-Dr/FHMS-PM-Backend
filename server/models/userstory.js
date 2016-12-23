var mongoose = require('mongoose');
var schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');

//autoIncrement.initialize(db);

var userStorySchema = new schema({
        title: String,
        //type: schema.ObjectId,
        //ref: 'users',
        complete: Boolean,
        timestmp: Date
    },
    {versionKey: false} // DISABLE VERSIONING (_v)
);

//userStorySchema.plugin(autoIncrement.plugin, 'userStory');
//var userStory = db.model('userStory', userStorySchema);

userStorySchema.methods.displayTitle = function (cb) {
    return this.title;
};

module.exports = mongoose.model('userStory', userStorySchema);