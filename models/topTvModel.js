const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type:String,
        require:true
    }
},{
    timestamps: true  
});

var topTvSchema = new Schema({
    popularity:{
        type:Number
    },
    id:{
        type:Number
    },
    vote_count:{
        type:Number
    },
    vote_average:{
        type:Number
    },
    name:{
        type:String,
        required:true
    },
    first_air__date:{
        type:String
    },
    original_language:{
        type:String
    },
    original_name:{
        type:String
    },
    origin_country:[String],
    genere_ids:[Number],
    backdrop_path:{
        type:String
    },
    overview:{
        type:String
    },
    poster_path:{
        type:String,
        required:true
    },
    comments:[commentSchema]
});

var topTvModel = mongoose.model('toptv',topTvSchema);

module.exports =  topTvModel;