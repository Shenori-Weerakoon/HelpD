import { useNavigate } from 'react-router-dom';
//import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';


const AdminDashboardPage = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    /*const handleDoneClick = () => {
        navigate('/home');
    };*/

    const ManageUsersClick = () => {
        navigate('/manage-users');
    };
    
    return (
        <>
        <Sidebar role="admin"/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
                <button 
                    onClick={handleSignUpClick} 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Register a User
                </button>
                
                <button 
                    onClick={ManageUsersClick} 
                    className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200"
                >
                    Manage Users
                </button>
                {/*<button 
                    onClick={handleDoneClick} 
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                    Done
                </button>*/}
            </div>
        </div>
        </>
        
    );
};

export default AdminDashboardPage;
