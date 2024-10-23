import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import bannerlogo from '../images/bannerlogo.png'; // Uncomment if you have a logo

const Navbar = () => {
    
    // Simulate checking login status
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                await axios.get('http://localhost:5000/api/users'); // Your API for fetching user details
            } catch (error) {
                console.log('Not logged in', error);
            }
        };
        fetchUserDetails();
    }, []);

    return (
        <nav className="bg-[#2596be] p-4 fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center"> 
                <Link to="/" className="text-white text-xl font-bold flex items-center">
                    {/*<img src="bannerlogo" alt="Logo" className="h-8 inline-block mr-2" />*/} 
                    OSI Help Desk
                </Link>

                {/* Menu Items */}
                <div className="space-x-4 text-white">
                    <Link to="/Home" className="hover:text-gray-200">Home</Link>
                    <Link to="/services" className="hover:text-gray-200">Services</Link>
                    <Link to="/knowledge-base" className="hover:text-gray-200">Search Knowledge Base</Link>
                    <Link to="/about" className="hover:text-gray-200">About</Link>
                    <Link to="/customer-stories" className="hover:text-gray-200">Customer Stories</Link>
                </div>

                {/* Right Section: Login or User's First Name */}
                <div>
                        <Link to="/login" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                            Login
                        </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
