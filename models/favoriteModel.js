const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const favorites = new Schema({
    id:{
        type:String,
        required:true
    },
    favoriteMovie:[],
    favoriteTv:[]
});

var favoritesModel = mongoose.model('favorites',favorites);

module.exports =  favoritesModel;