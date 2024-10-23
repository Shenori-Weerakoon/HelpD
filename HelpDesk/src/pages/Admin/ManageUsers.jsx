import { useEffect, useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';


const ManageUsers = () => {
    //const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users.');
            }
        };
        fetchUsers();
    }, []);

    // Handle user data updates (save changes)
    const handleSaveClick = async (uid) => {
        try {
            const updatedUser = users.find(user => user.uid === uid);
            await axios.put(`http://localhost:5000/api/users/${uid}`, updatedUser);
            setEditUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user.');
        }
    };

    // Handle input changes for editable fields
    const handleInputChange = (uid, field, value) => {
        setUsers(users.map(user =>
            user.uid === uid ? { ...user, [field]: value } : user
        ));
    };

    const handleEditClick = (uid) => {
        setEditUser(uid);
    };

    const handleCancelClick = () => {
        setEditUser(null);
    };

    /*const handleDoneClick = () => {
        navigate('/admin-dashboard');
    };*/

    // Handle deleting a user
    const handleDeleteClick = async (uid) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${uid}`);
            setUsers(users.filter(user => user.uid !== uid));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user.');
        }
    };

    return (
        <>
        <Navbar/>
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">User Management</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {users.length > 0 ? (
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">UID</th>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.uid} className="border-t">
                                <td className="px-4 py-2">{user.uid}</td>
                                <td className="px-4 py-2">
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.firstName}
                                            onChange={(e) => handleInputChange(user.uid, 'firstName', e.target.value)}
                                            className="p-2 border border-gray-300 rounded"
                                        />
                                    ) : (
                                        user.firstName
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.lastName}
                                            onChange={(e) => handleInputChange(user.uid, 'lastName', e.target.value)}
                                            className="p-2 border border-gray-300 rounded"
                                        />
                                    ) : (
                                        user.lastName
                                    )}
                                </td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.phoneNumber || ''}
                                            onChange={(e) => handleInputChange(user.uid, 'phoneNumber', e.target.value)}
                                            className="p-2 border border-gray-300 rounded"
                                        />
                                    ) : (
                                        user.phoneNumber || 'N/A'
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editUser === user.uid ? (
                                        <input
                                            type="text"
                                            value={user.location || ''}
                                            onChange={(e) => handleInputChange(user.uid, 'location', e.target.value)}
                                            className="p-2 border border-gray-300 rounded"
                                        />
                                    ) : (
                                        user.location || 'N/A'
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editUser === user.uid ? (
                                        <>
                                            <button
                                                onClick={() => handleSaveClick(user.uid)}
                                                className="mr-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelClick}
                                                className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEditClick(user.uid)}
                                                className="mr-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(user.uid)}
                                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No users to display.</p>
            )}
            {/*<button
                onClick={handleDoneClick}
                className="mt-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
                Done
            </button>*/}
        </div>
        </>
        
    );
};

export default ManageUsers;
