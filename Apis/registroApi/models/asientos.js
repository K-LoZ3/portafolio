const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const asientoSchema = new Schema({
    tipo: {
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    registros: [{
        type: String,
        required: true
    }],
    naturalezas: [{
        type: Boolean,
        required: true
    }],
    montos: [{
        type: Currency,
        required: true,
        min: 0
    }]
},{
    timestamps: true
});

var Asientos = mongoose.model('asiento', asientoSchema);

module.exports = Asientos;