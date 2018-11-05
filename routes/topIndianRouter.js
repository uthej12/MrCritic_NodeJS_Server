const express = require('express');
const bodyParser = require('body-parser');
const TopIndian = require('../models/topIndianModel');
const cors = require('cors');

const topIndianRouter = express.Router();

topIndianRouter.use(bodyParser.json());

topIndianRouter.use(cors({origin: 'http://localhost:3001'}));

topIndianRouter.route('/')
.get((req,res,next) => {
    TopIndian.find({})
    .then((movies) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(movies);
    }).catch((err) => console.log(err));
});

topIndianRouter.route('/:_id')
.get((req,res,next) => {
    console.log(req.params);
    TopIndian.findOne(req.params)
    .then((movies) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(movies);
    }).catch((err) => console.log(err));
});

module.exports = topIndianRouter;