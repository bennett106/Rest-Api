const express = require("express");
const router = express.Router();

const {getVacationLeave, createVacationLeaves} = require("../controlers/vacationLeave")

//routing for get and post for vacation leave
router.route("/vacationLeave").get(getVacationLeave);
router.route('/vacationLeave').post(createVacationLeaves);

//routing for get and post for vacationLeave

module.exports = router;