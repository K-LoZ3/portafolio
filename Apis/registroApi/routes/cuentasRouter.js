const express = require('express');
const bodyParser = require('body-parser');

const Cuentas = require('../models/cuentas');

const cuentasRouter = express.Router();

cuentasRouter.use(bodyParser.json());

cuentasRouter.route('/')
.get((req, res, next) => {
    Cuentas.find({})
    .then(cuentas => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cuentas);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    Cuentas.create(req.body)
    .then(asiento => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(asiento);
    }, err => next(err));
    
})
.put((req, res, next) => {
    res.send('No soported');
})
.delete((req, res, next) => {
    Cuentas.remove({})
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err));
});

cuentasRouter.route('/:cuentaId')
.get((req, res, next) => {
    Cuentas.findById(req.params.cuetaId)
    .then(cuenta => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cuenta);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.send('No soported');
})
.put((req, res, next) => {
    Cuentas.findByIdAndUpdate(req.params.cuetaId, { $set: req.body}, { new: true })
    .then(cuenta => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cuenta);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Cuentas.findByIdAndRemove(req.params.cuentaId)
    .then( resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = cuentasRouter;