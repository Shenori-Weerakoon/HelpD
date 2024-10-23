import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const CustomerHomePage = () => {
    return (
        <>
        <Sidebar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Help Desk System</h1>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link 
                            to="/create-ticket" 
                            className="block w-48 text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Create Ticket
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/view-tickets" 
                            className="block w-48 text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            View Tickets
                        </Link>
                    </li>
                    {/*<li>
                        <Link 
                            to="/admin-dashboard" 
                            className="block w-48 text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Admin Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/engineer-dashboard" 
                            className="block w-48 text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Support Engineer Dashboard
                        </Link>
                    </li>*/}
                    <li>
                        <Link 
                            to="/user-account" 
                            className="block w-48 text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Account
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <Footer />
        </>
        
    );
};

export default CustomerHomePage;