const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topMoviesSchema = new Schema({
    popularity:{
        type:Number
    },
    id:{
        type:Number
    },
    video:{
        type:Boolean
    },
    vote_count:{
        type:Number
    },
    vote_average:{
        type:Number
    },
    title:{
        type:String,
        required:true
    },
    release_date:{
        type:String
    },
    original_language:{
        type:String
    },
    original_title:{
        type:String
    },
    genere_ids:[Number],
    backdrop_path:{
        type:String
    },
    adult:{
        type:Boolean
    },
    overview:{
        type:String
    },
    poster_path:{
        type:String,
        required:true
    }
});

var topMoviesModel = mongoose.model('topmovie',topMoviesSchema);

module.exports =  topMoviesModel;