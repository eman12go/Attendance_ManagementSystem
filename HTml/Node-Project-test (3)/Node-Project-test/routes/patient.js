const express= require("express");
const mongoose = require('mongoose');
const controller = require("./../controller/patient");
const validator = require("./../middlewares/errorValidation");
const validation = require("./../middlewares/validations");
const advancedResults = require ("./../middlewares/advancedResult");
const allowedUsers =require("./../middlewares/AuthorizeRole");

require('./../model/patient');
const patient= mongoose.model('patient');

//include other resource routers
const appointmentRouter = require('./appointment');


const router = express.Router();


// Re-route into other resource routers 
router.use('/patient/:patientId/appointment',controller.newAppointment,appointmentRouter)


router.route("/patient")
.get(allowedUsers.checkWithRole("admin"),advancedResults(patient),controller.getPatients)
.post(allowedUsers.checkWithRole("admin","patient"),validation.patientPost,validator,controller.createPatient)


router.route("/patient/:id")
.get(allowedUsers.checkWithRole("admin","patient"),validation.paramIdInt,validator,controller.getPatient)
.delete(allowedUsers.checkWithRole("admin"),validation.paramIdInt,validator,controller.deletePatient)
.patch(allowedUsers.checkWithRole("admin","patient"),validation.patientUpdate,validator,controller.updatePatient)

module.exports=router;