const mongoos = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoos.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    favorites:[]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoos.model('User',UserSchema);