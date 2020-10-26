const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const cuentaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categoria: {
        type: String,
        required: true
    },
    montoT: {
        type: Currency,
        required: true,
        min: 0
    },
    montos: [{
        type: Currency,
        required: true,
        min: 0
    }],
    naturalezas: [{
        type: Boolean,
        required: true
    }],
    asientos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asiento'
    }]
},{
    timestamps: true
});

var Cuentas = mongoose.model('cuenta', cuentaSchema);

module.exports = Cuentas;