const dayLeave = require("../models/dayLeave");

const getDayLeave = async (req, res) => {
    const dayLeave_data = await dayLeave.find(req.query);
    res.status(200).json({ dayLeave_data });
};

const createDayLeaves = async (req, res) => {
    try {
        const dayLeaveDataArray = req.body; // Assuming you are sending an array in the request body

        // Create an array to store the created dayLeave documents
        const createdDayLeaves = [];

        // Loop through the array and create a new dayLeave document for each object
        for (const dayLeaveData of dayLeaveDataArray) {
            const {
                name,
                branch,
                semester,
                rollNo,
                roomNo,
                dateOfLeaving,
                timeOfLeaving,
                purpose,
                timeOfReturn,
            } = dayLeaveData;

            // Create a new dayLeave instance based on your schema
            const newDayLeave = new dayLeave({
                name,
                branch,
                semester,
                rollNo,
                roomNo,
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