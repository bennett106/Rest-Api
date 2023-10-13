const express = require("express");
const router = express.Router();

const {getDayLeave, createDayLeaves} = require("../controllers/dayLeave");

//* using the validation for dayleave route
// made it private route after using validate token //* only verified users can perform this action
const validateToken = require("../middleware/auth");
router.use(validateToken);

//? routing for get and post for dayLeave
router.route("/dayLeave").get(getDayLeave).post(createDayLeaves);


module.exports = router;