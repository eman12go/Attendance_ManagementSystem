const express = require("express");
const router = express.Router();
const validator = require("./../middlewares/errorValidation");
const controller = require("./../controller/calender");
const validation=require("./../middlewares/validations");
const mongoose = require('mongoose');
const advancedResults = require ("./../middlewares/advancedResult");
require('../model/doctorCalender');
 const calender= mongoose.model('calender');
 const allowedUsers =require("./../middlewares/AuthorizeRole");


router.route("/")
  .get(allowedUsers.checkWithRole("admin","employee","doctor"),advancedResults(calender),controller.getCalenders)
  .post(allowedUsers.checkWithRole("admin","employee"),validation.calenderPost,validator, controller.createCalender)



router.route("/:id")
  .get(allowedUsers.checkWithRole("admin","doctor","employee"),validation.paramIdInt,validator,controller.getCalender)
  .delete(allowedUsers.checkWithRole("admin","employee"),validation.paramIdInt,validator,controller.deleteCalender)


module.exports = router;
