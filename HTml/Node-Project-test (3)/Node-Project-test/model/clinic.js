const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true, unique: true },
    email: {
        type: String, required: true, trim: true, lowercase: true, unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    location: { type: String, required: true },
    speciality: {
        type: String, enum: {
            values: ['cardiology', 'dentistry', 'ENT', 'dermatology', 'nutrition'],
            message: 'this Specialization is not supported'
        }
    },
    medicines: { type: Array, ref: "medicine" },
    doctors: { type: Array, ref: "doctors" },
    employees: { type: Array, ref: "employee" },
    Patient: { type: Array, ref: "patient" }
}, { _id: false })


Schema.plugin(AutoIncrement, { id: 'clinic_id_counter', inc_field: '_id' });

mongoose.model("clinic", Schema);