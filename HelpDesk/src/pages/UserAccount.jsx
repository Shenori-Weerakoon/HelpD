import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase'; // Firebase auth
import { useNavigate } from 'react-router-dom';
//import Navbar from '../components/Navbar';


const UserAccount = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: ''
    });
    const [uid, setUid] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
    const navigate = useNavigate();

    // Set UID after the user is authenticated
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUid(user.uid); // Set the user's UID
        }
    }, []);

    // Fetch user details using UID
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (uid) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
                    setUserData(response.data);
                    setRole(response.data.role);
                    setIsLoading(false);
                } catch (error) {
                    setError('Failed to fetch user details.', error);
                    setIsLoading(false);
                }
            }
        };
        fetchUserDetails();
    }, [uid]);

    // Handle input changes for editable fields
    const handleInputChange = (field, value) => {
        setUserData({
            ...userData,
            [field]: value
        });
    };

    // Save changes
    const handleSaveClick = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users/${uid}`, userData);
            alert('User details updated successfully!');
            setIsEditing(false); // Exit editing mode after saving
        } catch (error) {
            console.error('Error updating user details:', error);
            setError('Failed to update user details.');
        }
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handle 'Done' button click to navigate to a different page
    const handleDoneClick = () => {
        if (role === 'admin') {
            navigate('/admin-view-tickets'); // Redirect to admin view
        } else if (role === 'support_engineer') {
            navigate('/support-engineer-view-tickets'); // Redirect to support engineer view
        } else {
            navigate('/customer-homepage'); // Default page
        }
    };

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
        
                <div className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Account Details</h1>
            {isEditing ? (
                // Editable form fields in "Edit Mode"
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-600">First Name:</label>
                        <input
                            type="text"
                            value={userData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Last Name:</label>
                        <input
                            type="text"
                            value={userData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Email:</label>
                        <input
                            type="email"
                            value={userData.email}
                            disabled
                            className="w-full border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Phone Number:</label>
                        <input
                            type="text"
                            value={userData.phoneNumber || ''}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Location:</label>
                        <input
                            type="text"
                            value={userData.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveClick}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500"
                    >
                        Save
                    </button>
                </form>
            ) : (
                // View mode: Display user data as text
                <div className="space-y-4">
                    <p><strong>First Name:</strong> {userData.firstName}</p>
                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber || 'N/A'}</p>
                    <p><strong>Location:</strong> {userData.location || 'N/A'}</p>
                    <button
                        type="button"
                        onClick={handleEditClick}
                        className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-400"
                    >
                        Edit
                    </button>
                </div>
            )}
            <button
                type="button"
                onClick={handleDoneClick}
                className="w-full bg-gray-700 text-white p-2 rounded-md mt-4 hover:bg-gray-600"
            >
                Done
            </button>
        </div>
        </>

    );
};

export default UserAccount;
