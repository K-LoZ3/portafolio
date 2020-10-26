const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const totalSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cuenta'
    },
    categoria: {

    },
    montoT: {
        type: Currency,
        required: true,
        min: 0
    },
    naturaleza: [{
        type: Boolean,
        required: true
    }],
    monto: [{
        type: Currency,
        required: true,
        min: 0
    }],
    asiento: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asiento'
    }]
},{
    timestamps: true
});

var Totales = mongoose.model('total', totalSchema);

module.exports = Totales;