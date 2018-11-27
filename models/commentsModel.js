const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required:true
    }
});

const comments = new Schema({
    id:{
        type:Number,
        required:true
    },
    comments: [commentSchema],
});

var commentsModel = mongoose.model('comment',comments);

module.exports =  commentsModel;