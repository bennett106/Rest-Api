const new_user = require("../models/newUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ? access -> public
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }

        // Check if the user already exists
        const userAvailable = await new_user.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered!");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await new_user.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log(`Successfully created a user -> ${user}`);
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email });
        } else {
            res.status(400);
            throw new Error('Unable to create an account!');
        }
    } catch (error) {
        // Handle any errors that occurred during registration
        res.status(500).json({ error: error.message });
    }
};


// ? access -> public
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        const user = await new_user.findOne({ email });
        // compare password with hashedpassword
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
            );
            res.status(200).json({ accessToken });
        } else {
            res.status (401);
            throw new Error("email or Password is invalid!");
        }

    } catch (error) {
        // Handle any errors that occures during login
        res.status(500).json({ error: error.message });
    }
};


// ! access -> private
const currentUser = async (req, res) => {
    res.json(req.user);
};

module.exports = { registerUser, loginUser, currentUser };
