const express = require('express');
const bodyParser = require('body-parser');
const TopMovies = require('../models/topMoviesModel');
const cors = require('cors');

const topMoviesRouter = express.Router();

topMoviesRouter.use(bodyParser.json());

topMoviesRouter.use(cors({origin: 'http://localhost:3001'}));


topMoviesRouter.route('/')
.get((req,res,next) => {
    TopMovies.find({})
    .then((movies) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(movies);
    }).catch((err) => console.log(err));
});

topMoviesRouter.route('/:_id')
.get((req,res,next) => {
    console.log(req.params);
    TopMovies.findOne(req.params)
    .then((movies) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(movies);
    }).catch((err) => console.log(err));
});

module.exports = topMoviesRouter;