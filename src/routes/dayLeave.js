const express = require("express");
const router = express.Router();

const {getDayLeave, createDayLeaves} = require("../controlers/dayLeave")

//routing for get and post for dayLeave
router.route("/dayLeave").get(getDayLeave);
router.route('/dayLeave').post(createDayLeaves);

//routing for get and post for vacationLeave

module.exports = router;