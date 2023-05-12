const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    paymentType: {
        type: String, enum: {
            values: ['Cash', 'Credit Card', ' Insurance Card'],
            message: 'This way of payment do not allowed'
        }
    },
    totalCost: Number,
    date: {
        type: Date,
        min: '2023-01-01'
    },
    status:{
        type:String,
        enum:["Success","Failed"]
    },
    doctor: { type: Number, ref: "doctor" },
    patient: { type: Number, ref: "patient" },
    // clinic ref
}, { _id: false })

schema.plugin(AutoIncrement, { id: 'invoice_id_counter', inc_field: '_id' });

mongoose.model("invoice", schema);