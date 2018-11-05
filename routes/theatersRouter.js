const express = require('express');
const bodyParser = require('body-parser');
const Theaters = require('../models/theatersModel');
const cors = require('cors');

const theatersRouter = express.Router();

theatersRouter.use(bodyParser.json());

theatersRouter.use(cors({origin: 'http://localhost:3001'}));

theatersRouter.route('/')
.get((req,res,next) => {
    Theaters.find({})
    .then((theaters) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(theaters);
    }).catch((err) => console.log(err));
})
.put((req,res,next) => {
    res.end('PUT operation not supported on /theaters');
})
.post((req,res,next) => {
    res.end('POST operation not supported on /theaters');
})
.delete((req,res,next) => {
    res.end('DELETE operation not supported on /theaters');
});


theatersRouter.route('/:_id')
.get((req,res,next) => {
    console.log(req.params)
    Theaters.findOne(req.params)
    .then((theaters) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(theaters);
    }).catch((err) => console.log(err));
})
.put((req,res,next) => {
    res.end('PUT operation not supported on /theaters/' + req.params.id);
})
.post((req,res,next) => {
    res.end('POST operation not supported on /theaters/' + req.params.id);
})
.delete((req,res,next) => {
    res.end('DELETE operation not supported on /theaters/' + req.params.id);
});


module.exports = theatersRouter;