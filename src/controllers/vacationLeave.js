const vacationLeave = require("../models/vacationLeave"); // Import the new model

const getVacationLeave = async (req, res) => {
    const vacationLeave_data = await vacationLeave.find(req.query);
    res.status(200).json({ vacationLeave_data });
};

const createVacationLeaves = async (req, res) => {
    try {
        const vacationLeaveDataArray = req.body; // Assuming you are sending an array in the request body

        // Create an array to store the created vacationLeave documents
        const createdVacationLeaves = [];

        // Loop through the array and create a new vacationLeave document for each object
        for (const vacationLeaveData of vacationLeaveDataArray) {
            const {
                // Define vacation leave-specific fields here
                employeeName,
                startDate,
                endDate,
                reason,
                // ...
            } = vacationLeaveData;

            // Create a new vacationLeave instance based on your schema
            const newVacationLeave = new vacationLeave({
                employeeName,
                startDate,
                endDate,
                reason,
                // ...
            });

            // Save the new vacationLeave record to the database
            const savedVacationLeave = await newVacationLeave.save();

            // Add the saved vacationLeave document to the array
            createdVacationLeaves.push(savedVacationLeave);
        }

        res.status(201).json(createdVacationLeaves); // Respond with an array of created vacationLeave objects
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getVacationLeave, createVacationLeaves };
