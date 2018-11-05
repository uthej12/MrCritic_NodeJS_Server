const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theaterSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

var theaters = mongoose.model('theater', theaterSchema);

module.exports = theaters;