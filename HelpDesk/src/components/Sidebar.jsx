import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = ({ role }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const getTicketPath = () => {
        switch (role) {
            case 'admin':
                return '/admin-view-tickets';
            case 'customer':
                return '/view-tickets';
            case 'support_engineer':
                return '/assigned-tickets';
            default:
                return '/view-tickets'; // Default path if no valid role
        }
    }

    const getDashboardPath = () => {
        switch (role) {
            case 'admin':
                return '/dashboard';
            case 'customer':
                return '/customer-homepage';
            case 'support_engineer':
                return '/support-engineer-dashboard';
            default:
                return '/'; // Default path if no valid role
        }
    };

    return (
        <div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>
                <ul className="space-y-4">
                    <li>
                        <Link to={getDashboardPath()} className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to={getTicketPath()} className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                            Tickets
                        </Link>
                    </li>
                    <li>
                        <Link to="/reviews" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                            Reviews
                        </Link>
                    </li>

                    {/* Conditionally render 'Manage Users' for admin role */}
                    {role === 'admin' && (
                        <li>
                            <Link to="/admin-dashboard" className="block p-3 bg-gray-700 rounded hover:bg-gray-600">
                                Manage Users
                            </Link>
                        </li>
                    )}

                </ul>
            </div>
            {/* Bottom Section - Logout Tab */}
            <div className="p-6">
                <button 
                    onClick={handleLogout} 
                    className="w-full p-3 bg-gray-700 rounded hover:bg-gray-600 text-left">
                    Logout
                </button>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    role: PropTypes.string, // Validate that role is a string (optional prop)
};

// Default props (if role is not provided)
Sidebar.defaultProps = {
    role: '', // Default to empty string if no role is passed
};

export default Sidebar;
