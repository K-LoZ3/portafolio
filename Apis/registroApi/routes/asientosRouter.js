const express = require('express');
const bodyParser = require('body-parser');

const Asientos = require('../models/asientos');
const Cuentas = require('../models/cuentas');

const asientosRouter = express.Router();

asientosRouter.use(bodyParser.json());

asientosRouter.route('/')
.get((req, res, next) => {
    Asientos.find({})
    .then(asientos => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(asientos);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    Cuentas.find({_id: { $in: req.body.registros }})
    .then( cuentas => {
        Asientos.create(req.body)
        .then(asiento => {
            var i = 0;
            cuentas.forEach( cuenta => {
                if(req.body.naturalezas[i])
                    cuenta.montoT += req.body.montos[i];
                else
                    cuenta.montoT -= req.body.montos[i];
                
                cuenta.naturalezas.push(req.body.naturalezas[i]);
                cuenta.montos.push(req.body.montos[i]);
                cuenta.asientos.push(asiento._id);
                cuenta.save()
                .then( () => {
                    res.statusCode = 200;
                });
                i++;
            });
            res.setHeader('Content-Type', 'application/json');
            res.json(asiento);          
        }, err => next(err));
    }, (err) => next(err));
    
})
.put((req, res, next) => {
    res.send('No soported');
})
.delete((req, res, next) => {
    Asientos.remove({})
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err))
    .catch(err => next(err)); 
});

asientosRouter.route('/:asientoId')
.get((req, res, next) => {
    Asientos.findById(req.params.asientoId)
    .then(asiento => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(asiento);
    }, err => next(err))
    .catch(err => next(err));
})
.post((req, res, next) => {
    res.send('No soported');
})
.put((req, res, next) => {
    res.send('No soported');
})
.delete((req, res, next) => {
    Asientos.findByIdAndRemove(req.params.asientoId)
    .then( resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = asientosRouter;