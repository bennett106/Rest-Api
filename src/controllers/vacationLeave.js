const VacationLeave = require("../models/vacationLeave");
const User = require("../models/user");


//* Retrieve vacation leave requests
//* work on this later to get the documents created by a specific user using the token

const getVacationLeave = async (req, res) => {
  try {
    const vacationLeave_data = await vacationLeave.find(req.query);
    res.status(200).json({ vacationLeave_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//* create vacation leave applications

const createVacationLeaves = async (req, res) => {
    try {
        // Extract user information from the token
        const { _id } = req.user._id; // Assuming user's identity is stored in the "user" property of the request
        console.log("Object ID for the vacation application :- ",_id);
        // Fetch user details from the User model
        const user = await User.findById(_id).select('fullname studentInfo.rollNo studentInfo.department contactNumber parentDetails.FatherName  parentDetails.MotherName parentDetails.parentContactNo');
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        console.log("----------------------------------------------------------------");
        console.log("User Details:-");
        console.log(user);
    
        const vacationLeaveData = req.body; // Assuming you receive a single JSON object
        // console.log(vacationLeaveData);
        const {
          dateOfLeaving,
          purpose,
          dateOfReturn,
        } = vacationLeaveData;
    
        console.log("-----------------------------------------------------------");
        console.log("This is the req.body section",req.body);
        console.log(dateOfLeaving, purpose, dateOfReturn);
        
        // Define and assign values to verified and approvedBy
        const verified = false; // Example value, you can set it based on your logic
        const approvedBy = null; // Example value, you can set it based on your logic

        try {
          const vacationLeave = new VacationLeave({
            dateOfLeaving,
            purpose,
            dateOfReturn,
            PostedBy: _id,
            fullname: user.fullname,
            rollNo: user.studentInfo.rollNo,
            department: user.studentInfo.department,
            contactNumber: user.contactNumber,
            FatherName: user.parentDetails.FatherName,
            MotherName: user.parentDetails.MotherName,
            parentContactNo: user.parentDetails.parentContactNo,
            verified,
            approvedBy
          });
          await vacationLeave.save(); // Wait for the post to be saved before proceeding
          console.log("***********Success***************");      // if the user is created successfully
          return res.json(vacationLeave);
        } catch (error) {
          console.log(error);
          return res
            .status(400)
            .send("Error while submitting the content. Please try again.");
        }
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
}
    
module.exports = { getVacationLeave, createVacationLeaves };
