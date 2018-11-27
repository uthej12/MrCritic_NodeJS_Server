const express = require('express');
const bodyParser = require('body-parser');
const Favorites = require('../models/favoriteModel');
const cors = require('cors');
var authenticate = require('../authenticate');


const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.use(cors({origin: 'http://localhost:3001'}));

favoritesRouter.route('/')
.get(authenticate.verifyUser,(req,res,next) =>{
    Favorites.find({id:req.user._id})
    .then((data) => {
        res.json(data);
    }).catch((err) => res.json(err));
});

favoritesRouter.route('/movies')
.get(authenticate.verifyUser,(req,res,next) => {
    Favorites.findOne({id:req.user._id})
    .then((favorites) => {
        if(favorites.favoriteMovie == null){
            res.json({'status':'unsucessful','reason':'no favorite Movie'})
        }
        else 
            res.json(favorites.favoriteMovie);
    }).catch((err) => {console.log(err);res.json({'status':'unsucessful','reason':'no Favorite Movie'})});
})
.post((req,res,next) =>{
    res.json('POST NOT SUPPORTED')
});

favoritesRouter.route('/tv')
.get(authenticate.verifyUser,(req,res,next) => {
    Favorites.findOne({id:req.user._id})
    .then((favorites) => {
        if(favorites.favoriteTv == null){
            res.json({'status':'unsucessful','reason':'no favorite TV'})
        }
        else 
            res.json(favorites.favoriteTv);
    }).catch((err) => {console.log(err);res.json({'status':'unsucessful','reason':'no favorite TV'})});
})
.post((req,res,next) =>{
    res.json('POST NOT SUPPORTED')
});


favoritesRouter.route('/movies/:id')
.get((req,res,net) => {
    res.json('GET NOT SUPPORTED');
})
.post(authenticate.verifyUser, (req,res,next) => {
    movieId = req.params.id;
    id = req.user._id;
    console.log("id=",id," movieId=",movieId);
    Favorites.findOne({id:id})
    .then((favorites) =>{
        if(favorites == null) {
            Favorites.create({id:id})
            .then((newEntry) => {
                console.log('new Entry');
                newEntry.favoriteMovie.push(movieId);
                newEntry.save()
                .then((data) => {
                    res.json({"status":"successful"});
                }).catch((err) => res.json(err));
            }).catch((err) => res.json(err));
        }
        else{
            //console.log('Movie Comments Exist and username',req.user.name);
            inFavorites = false;
            //Check if already commented
            for(var i=0; i<favorites.favoriteMovie.length; i++){
                if(favorites.favoriteMovie[i] == movieId){
                    inFavorites = true;
                }
            }
            if(!inFavorites){
                favorites.favoriteMovie.push(movieId);
                favorites.save()
                    .then((data) => {
                        res.json({"status":"successful"});
                    }).catch((err) => console.log(err));
            }
            else{
                res.json({"status":"unsuccessful","reason":"Already in favorites"});
            }
        }
    }).catch((err) => res.json(err));
})
.delete(authenticate.verifyUser, (req,res,next) => {
    movieId = req.params.id;
    id = req.user._id;
    //console.log("id=",id," movieId=",movieId);
    Favorites.findOne({id:id})
    .then((favorites) =>{
        if(favorites == null) {
            res.json({"status":"unsuccessful","reason":"No favorites for user"})
        }
        else{
            //console.log('Movie Comments Exist and username',req.user.name);
            inFavorites = false;
            //Check if already commented
            for(var i=0; i<favorites.favoriteMovie.length; i++){
                //console.log('Checking ',favorites.favoriteMovie[i].id," movieId ",movieId);
                if(favorites.favoriteMovie[i] == movieId){
                    inFavorites = true;
                }
            }
            //console.log(inFavorites)
            if(inFavorites){
                //console.log('Element in Favorites so delting',favorites.favoriteMovie);
                favorites.favoriteMovie.remove(movieId);
                favorites.save()
                .then((data) =>{
                    res.json(data);
                });
            }
            else{
                res.json({"status":"unsuccessful","reason":"Item not in Favorites"});
            }
        }
    }).catch((err) => res.json(err));
});

favoritesRouter.route('/tv/:id')
.get((req,res,net) => {
    res.json('GET NOT SUPPORTED');
})
.post(authenticate.verifyUser, (req,res,next) => {
    tvId = req.params.id;
    id = req.user._id;
    //console.log("id=",id," movieId=",tvId);
    Favorites.findOne({id:id})
    .then((favorites) =>{
        if(favorites == null) {
            Favorites.create({id:id})
            .then((newEntry) => {
                console.log('new Entry');
                newEntry.favoriteTv.push(tvId);
                newEntry.save()
                .then((data) => {
                    res.json({"status":"successful"});
                }).catch((err) => res.json(err));
            }).catch((err) => res.json(err));
        }
        else{
            //console.log('Movie Comments Exist and username',req.user.name);
            inFavorites = false;
            //Check if already commented
            for(var i=0; i<favorites.favoriteTv.length; i++){
                if(favorites.favoriteTv[i] == tvId){
                    inFavorites = true;
                }
            }
            if(!inFavorites){
                favorites.favoriteTv.push(tvId);
                favorites.save()
                    .then((data) => {
                        res.json({"status":"successful"});
                    }).catch((err) => console.log(err));
            }
            else{
                res.json({"status":"unsuccessful","reason":"Already in favorites"});
            }
        }
    }).catch((err) => res.json(err));
})
.delete(authenticate.verifyUser, (req,res,next) => {
    tvId = req.params.id;
    id = req.user._id;
    //console.log("id=",id," movieId=",movieId);
    Favorites.findOne({id:id})
    .then((favorites) =>{
        if(favorites == null) {
            res.json({"status":"unsuccessful","reason":"No favorites for user"})
        }
        else{
            //console.log('Movie Comments Exist and username',req.user.name);
            inFavorites = false;
            //Check if already commented
            for(var i=0; i<favorites.favoriteTv.length; i++){
                //console.log('Checking ',favorites.favoriteMovie[i].id," movieId ",movieId);
                if(favorites.favoriteTv[i] == tvId){
                    inFavorites = true;
                }
            }
            //console.log(inFavorites)
            if(inFavorites){
                //console.log('Element in Favorites so delting',favorites.favoriteMovie);
                favorites.favoriteTv.remove(tvId);
                favorites.save()
                .then((data) =>{
                    res.json(data);
                });
            }
            else{
                res.json({"status":"unsuccessful","reason":"Item not in Favorites"});
            }
        }
    }).catch((err) => res.json(err));
});

module.exports = favoritesRouter;