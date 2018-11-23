const express = require('express');
const bodyParser = require('body-parser');
const TopTv = require('../models/topTvModel');
const cors = require('cors');
var authenticate = require('../authenticate');

const topTvRouter = express.Router();

topTvRouter.use(bodyParser.json());

topTvRouter.use(cors({origin: 'http://localhost:3001'}));


topTvRouter.route('/')
.get((req,res,next) => {
    TopTv.find({})
    .then((tv) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(tv);
    }).catch((err) => console.log(err));
});

topTvRouter.route('/:_id')
.get((req,res,next) => {
    console.log(req.params);
    TopTv.findOne(req.params)
    .then((tv) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(tv);
    }).catch((err) => console.log(err));
});

topTvRouter.route('/:_id/comments')
.get((req,res) => {
    TopTv.findOne(req.params)
    .then((movie) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(movie.comments);
    }).catch((err) => console.log(err));
})
.post(authenticate.verifyUser, (req,res) => {
    TopTv.findOne(req.params)
    .then((movie) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        movie.comments.push({author:req.user.name,comment:req.body.comment});
        movie.save();
        res.json(movie);
    }).catch((err) => console.log(err));
});

module.exports = topTvRouter;