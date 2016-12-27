var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userStorySchema = new schema({
        _id: Number,
        title: String,
        autor: String,
        complete: Boolean,
        timestmp: Date
    },
    {versionKey: false} // DISABLE VERSIONING (_v)
);

userStorySchema.methods.displayTitle = function (cb) {
    return this.title;
};

module.exports = mongoose.model('userStory', userStorySchema);