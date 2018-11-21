var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate')


const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({Status:'Connected'});
});

router.post('/signup', (req,res,next) => {
  User.register(new User({username: req.body.username}), req.body.password, 
  (err, user) =>{
    user.name = req.body.name;
    user.email = req.body.email;
    user.save();
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      passport.authenticate('local')(req, res, () =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true,status:"Registration Successful!"})
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req,res)=>{

        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true,status:"You are successfully logged in",token:token});
});

router.get('/favorites', authenticate.verifyUser, (req,res) => {
    res.json(req.user.favorites);
})
.post('/favorites', authenticate.verifyUser, (req,res) =>{
  var _id = req.body._id;
  req.user.favorites.push(_id);
  req.user.save();
  res.json(req.user);
});

module.exports = router;
