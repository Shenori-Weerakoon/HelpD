import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Your firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User logged in:', user);
            
            // Fetch user role from the backend
            const response = await fetch(`http://localhost:5000/api/users/email?email=${email}`);
            
            const userData = await response.json();
            console.log('User data:', userData);

            // Check if the user exists and has a role
            if (response.ok && userData.role) {
                console.log('User role:', userData.role);
                // Redirect based on user role
                if (userData.role === 'customer') navigate('/customer-homepage');
                else if (userData.role === 'admin') navigate('/dashboard');
                else if (userData.role === 'support_engineer') navigate('/support-engineer-dashboard');
            } else {
                console.error('User role not found');
                //setError('User role not found');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
        <Footer />
        </>
        
    );
};

export default LoginPage;
