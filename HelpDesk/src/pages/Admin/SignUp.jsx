import { useState } from 'react';
import { auth } from '../../firebase'; // Your firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';


const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default role is 'customer'
    const [firstName, setFirstName] = useState(''); // Optional fields
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Save user in MongoDB with their role
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email,
                    password, // Typically, you wouldn't save the password in plain text
                    role,
                    firstName,
                    lastName,
                    phoneNumber,
                    location,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create user');
            }

            console.log('User signed up and saved:', user);
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setLocation('');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleDoneClick = () => {
        navigate('/admin-dashboard');
    };

    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-bold mb-6">Register a User</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="support_engineer">Support Engineer</option>
                </select>
                <div className="flex space-x-4">
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                    <button 
                        type="button" 
                        onClick={handleDoneClick} 
                        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
        </>
        
    );
};

export default SignUpPage;
