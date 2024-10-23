// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
} = require('../controllers/userController');

// Route to handle creating a new user
/*router.post('/', async (req, res) => {
    const { uid, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
 
        // Create a new user
        const newUser = new User({ uid, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:uid', async (req, res) => {
    console.log('UID received:', req.params.uid); // Debugging log
    const { uid } = req.params;
    try {
        const user = await User.findOne({ uid: uid });
        if (!user) {
            console.log('User not found for UID:', uid); // More debugging info
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// Route to get all users or filter by role using query parameters
router.get('/', async (req, res) => {
    const { role } = req.query; // Get role from query parameters

    try {
        // If a role is specified, fetch users with that role, otherwise get all users
        const users = role ? await User.find({ role }) : await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const { fullName, lastName, phoneNumber, location } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { uid },
            { fullName, lastName, phoneNumber, location },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        // Assuming you have a deleteUser function to remove the user from the database
        await User.deleteOne({ uid });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;*/

// User routes
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/email', getUserByEmail);
router.get('/:uid', getUserById);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);

module.exports = router;


