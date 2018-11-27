const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',UserSchema);