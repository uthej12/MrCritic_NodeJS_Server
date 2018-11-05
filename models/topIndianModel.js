const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topIndianSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    genres:[String],
    ratings:[Number],
    poster:{
        type:String
    },
    constentRating:{
        type:String
    },
    duration:{
        type:String
    },
    releaseDate:{
        type:String
    },
    averageRating:{
        type:Number
    },
    originalTitle:{
        type:String
    },
    storyline:{
        type:String
    },
    actors:[String],
    imdbRating:{
        type:Number
    },
    posterurl:{
        type:String
    }
});

var topIndian = mongoose.model('topIndianMovie',topIndianSchema);

module.exports = topIndian;