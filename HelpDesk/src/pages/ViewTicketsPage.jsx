import { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Firebase auth
//import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const ViewTicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [uid, setUid] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    // Fetch the current user's UID from Firebase
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUid(user.uid);
        }
    }, []);

    // Fetch user role from the backend
    useEffect(() => {
        const fetchUserRole = async () => {
            if (uid) {
                try {
                    console.log('Fetching role for UID:', uid);
                    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
                    console.log('User data received:', response.data); // Debugging output
    
                    if (response.data && response.data.role) {
                        setRole(response.data.role);  // Ensure the role is correctly set
                    } else {
                        console.error('No role found in user data');
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };
    
        fetchUserRole();
    }, [uid]);

    // Fetch tickets when the role is determined
    useEffect(() => {
        const fetchTickets = async () => {
            if (uid && role) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/tickets?uid=${uid}&role=${role}`);
                    console.log('Tickets fetched:', response.data);  // Debugging output
                    setTickets(response.data);
                } catch (error) {
                    console.error('Error fetching tickets:', error);
                }
            }
        };
    
        fetchTickets();
    }, [uid, role]);  // Fetch when `uid` and `role` are available

    const handleDelete = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <>
        <Sidebar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-6">View Tickets</h2>
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                {tickets.length > 0 ? (
                    <TicketList tickets={tickets} onDelete={handleDelete} />
                ) : (
                    <p className="text-center text-gray-500">No tickets to display</p>
                )}
                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Done
                </button>
            </div>
        </div>
        </>
        
    );
};

export default ViewTicketsPage;
