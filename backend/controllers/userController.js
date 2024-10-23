// controllers/userController.js
const User = require('../models/User'); // Import the User model

// Create a new user
const createUser = async (req, res) => {
    try {
        const { uid, email, password, role, firstName, lastName, phoneNumber, location } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create and save the new user
        const newUser = new User({ uid, email, password, role, firstName, lastName, phoneNumber, location });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    const { role } = req.query;
    try {
        const users = role ? await User.find({ role }) : await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {

    const { uid } = req.params;
    console.log('UID received:', uid); // Debugging log

    try {
        const user = await User.findOne({ uid });

        if (!user) {
            console.log('User not found for UID:', uid);
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Get user by email
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query; // Extract email from query parameters
        console.log('Email received:', email); // Debugging log

        const user = await User.findOne({ email }); // Query user by email

        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user); // Return user object
    } catch (error) {
        console.error('Error fetching user by email:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { fullName, lastName, phoneNumber, location } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { uid },
            { fullName, lastName, phoneNumber, location },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const deletedUser = await User.deleteOne({ uid });

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Export all controller functions
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
};
