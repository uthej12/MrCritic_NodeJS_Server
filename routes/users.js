var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('cors');


const User = require('../models/user');

router.use(cors({origin: 'http://localhost:3001'}));

/* GET users listing. */
router.get('/',authenticate.verifyUser, function(req, res, next) {
    res.json(req.user);
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
.post('/:param/favorites', authenticate.verifyUser, (req,res) =>{
  //console.log(req.params.param);
  if(req.params.param == 'topmovies' || req.params.param == 'topindian' || req.params.param == 'toptv'){
    var _id = req.body._id;
    var array = req.params.param;
    console.log("array",array);
    if(array == 'topmovies'){
      req.user.favorite.push(_id);
    }
    else if(array == 'topindian'){
      req.user.favoriteIndian.push(_id);
    }
    else if(array == 'toptv'){
      req.user.favoritetv.push(_id);
    }
    req.user.save();
    res.json(req.user); 
  }
  else{
    res.json({status:"error"});
  }
});

module.exports = router;
