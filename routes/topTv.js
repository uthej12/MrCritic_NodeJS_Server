const express = require('express');
const bodyParser = require('body-parser');
const TopTv = require('../models/topTvModel');
const cors = require('cors');

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

module.exports = topTvRouter;