const express = require('express');
const bodyParser = require('body-parser');
const Comments = require('../models/commentsModel');
const cors = require('cors');
var authenticate = require('../authenticate');


const commentsRouter = express.Router();

commentsRouter.use(bodyParser.json());

commentsRouter.use(cors({origin: 'http://localhost:3001'}));

commentsRouter.route('/')
.get((req,res,next) =>{
    Comments.find({})
    .then((data) => {
        res.json(data);
    }).catch((err) => res.json(err));
});

commentsRouter.route('/:id')
.get((req,res,net) => {
    Comments.findOne({id:req.params.id})
    .then((comments) => {
        if(comments.comments == null){
            res.json({'status':'unsucessful','reason':'no comments for movie'})
        }
        else 
            res.json(comments.comments);
    }).catch((err) => {console.log(err);res.json({'status':'unsucessful','reason':'no comments for movie'})});
})
.post(authenticate.verifyUser, (req,res,next) => {
    console.log(req.body);
    comment = req.body.comment;
    author = req.user.name;
    id = req.params.id;
    //console.log("id=",id," comment=",comment," author=",author);
    Comments.findOne({id:req.params.id})
    .then((movieComments) =>{
        if(movieComments == null) {
            Comments.create({id:req.params.id})
            .then((newEntry) => {
                newEntry.comments.push({comment:comment,author:author});
                newEntry.save()
                .then((data) => {
                    res.json({"status":"successful"});
                }).catch((err) => res.json(err));
            }).catch((err) => res.json(err));
        }
        else{
            //console.log('Movie Comments Exist and username',req.user.name);
            commented = false;
            //Check if already commented
            for(var i=0; i<movieComments.comments.length; i++){
                if(movieComments.comments[i].author == req.user.name){
                    commented = true;
                }
            }
            if(!commented){
                movieComments.comments.push({comment:comment,author:author});
                movieComments.save()
                    .then((data) => {
                        res.json({"status":"successful"});
                    }).catch((err) => console.log(err));
            }
            else{
                res.json({"status":"unsuccessful","reason":"User Already commented"});
            }
        }
    }).catch((err) => res.json(err));
});

module.exports = commentsRouter;