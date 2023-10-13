// const dayLeave = require("../models/dayLeave");

// const getDayLeave = async (req, res) => {
//     const dayLeave_data = await dayLeave.find(req.query);
//     res.status(200).json({ dayLeave_data });
// };

// const createDayLeaves = async (req, res) => {
//     try {
//         const dayLeaveDataArray = req.body; // Assuming you are sending an array in the request body

//         // Create an array to store the created dayLeave documents
//         const createdDayLeaves = [];

//         // Loop through the array and create a new dayLeave document for each object
//         for (const dayLeaveData of dayLeaveDataArray) {
//             const {
//                 name,
//                 branch,
//                 semester,
//                 rollNo,
//                 roomNo,
//                 dateOfLeaving,
//                 timeOfLeaving,
//                 purpose,
//                 timeOfReturn,
//             } = dayLeaveData;

//             // Create a new dayLeave instance based on your schema
//             const newDayLeave = new dayLeave({
//                 name,
//                 branch,
//                 semester,
//                 rollNo,
//                 roomNo,
//                 dateOfLeaving,
//                 timeOfLeaving,
//                 purpose,
//                 timeOfReturn,
//             });

//             // Save the new dayLeave record to the database
//             const savedDayLeave = await newDayLeave.save();

//             // Add the saved dayLeave document to the array
//             createdDayLeaves.push(savedDayLeave);
//         }

//         res.status(201).json(createdDayLeaves); // Respond with an array of created dayLeave objects
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// module.exports = { getDayLeave, createDayLeaves };




const DayLeave = require("../models/dayLeave");

// Retrieve day leave requests
const getDayLeave = async (req, res) => {
  try {
    const dayLeave_data = await DayLeave.find(req.query);
    res.status(200).json({ dayLeave_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create day leave requests
const createDayLeaves = async (req, res) => {
  try {
    const dayLeaveDataArray = req.body; // Assuming you are sending an array in the request body

    // Create an array to store the created dayLeave documents
    const createdDayLeaves = [];

    for (const dayLeaveData of dayLeaveDataArray) {
      const {
        userId, // Assuming you receive a userId in the request body
        dateOfLeaving,
        timeOfLeaving,
        purpose,
        timeOfReturn,
      } = dayLeaveData;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create a new dayLeave instance with the user reference
      const newDayLeave = new DayLeave({
        user: user._id, // Store the user's ObjectId as a reference
        dateOfLeaving,
        timeOfLeaving,
        purpose,
        timeOfReturn,
      });

      // Save the new dayLeave record to the database
      const savedDayLeave = await newDayLeave.save();

      // Add the saved dayLeave document to the array
      createdDayLeaves.push(savedDayLeave);
    }

    res.status(201).json(createdDayLeaves); // Respond with an array of created dayLeave objects
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getDayLeave, createDayLeaves };

