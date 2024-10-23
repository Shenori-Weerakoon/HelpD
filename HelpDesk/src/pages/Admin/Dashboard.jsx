import { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../firebase'; // Firebase auth
//import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; // Import the Sidebar component

const Dashboard = () => {
    const [openTickets, setOpenTickets] = useState(0);
    const [pendingTickets, setPendingTickets] = useState(0);
    const [solvedTickets, setSolvedTickets] = useState(0);
    const [unassignedTickets, setUnassignedTickets] = useState(0);
    const [uid, setUid] = useState(null);
    const [role, setRole] = useState(null);
    const [selectedTickets, setSelectedTickets] = useState([]);  // To hold selected tickets
    const [ticketType, setTicketType] = useState('');  // To hold the type of tickets (e.g., "Open Tickets")
    //const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUid(user.uid); // Set the user's UID
        }
    }, []);

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


    useEffect(() => {
        const fetchTickets = async () => {
            if (uid && role) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/tickets?uid=${uid}&role=${role}`);  // Pass role and uid
                    const tickets = response.data;

                    setOpenTickets(tickets.filter(ticket => ticket.status === 'not started').length);
                    setPendingTickets(tickets.filter(ticket => ticket.status === 'in progress' || ticket.status === 'stuck').length);
                    setSolvedTickets(tickets.filter(ticket => ticket.status === 'done').length);
                    setUnassignedTickets(tickets.filter(ticket => ticket.assignedSupportEngineer === 'Not Assigned').length);
                } catch (error) {
                    console.error('Error fetching tickets:', error);
                }
            }
        };

        fetchTickets();
    }, []);

    // Function to handle card click and show corresponding tickets
    const handleCardClick = async (statusType) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tickets/all-tickets?uid=${uid}`); // Fetch all tickets again
            const tickets = response.data;

            let filteredTickets;
            let typeLabel = '';

            switch (statusType) {
                case 'open':
                    filteredTickets = tickets.filter(ticket => ticket.status === 'not started');
                    typeLabel = 'Open Tickets';
                    break;
                case 'pending':
                    filteredTickets = tickets.filter(ticket => ticket.status === 'in progress' || ticket.status === 'stuck');
                    typeLabel = 'Pending Tickets';
                    break;
                case 'solved':
                    filteredTickets = tickets.filter(ticket => ticket.status === 'done');
                    typeLabel = 'Solved Tickets';
                    break;
                case 'unassigned':
                    filteredTickets = tickets.filter(ticket => ticket.assignedSupportEngineer === 'Not Assigned');
                    typeLabel = 'Unassigned Tickets';
                    break;
                default:
                    filteredTickets = [];
            }

            setSelectedTickets(filteredTickets);
            setTicketType(typeLabel);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <Sidebar role="admin" className="w-64 flex-shrink-0"/>

            {/* Dashboard Content */}
            <div className="flex-grow p-4 bg-gray-100 overflow-y-auto">
                {/* Cards 2x2 Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {/* Open Tickets */}
                    <div
                        className="bg-white shadow-md p-6 rounded-lg text-center cursor-pointer"
                        onClick={() => handleCardClick('open')}
                    >
                        <h2 className="text-xl font-bold">Open Tickets</h2>
                        <p className="text-4xl mt-2 text-blue-600">{openTickets}</p>
                    </div>

                    {/* Pending Tickets */}
                    <div
                        className="bg-white shadow-md p-6 rounded-lg text-center cursor-pointer"
                        onClick={() => handleCardClick('pending')}
                    >
                        <h2 className="text-xl font-bold">Pending Tickets</h2>
                        <p className="text-4xl mt-2 text-yellow-500">{pendingTickets}</p>
                    </div>

                    {/* Solved Tickets */}
                    <div
                        className="bg-white shadow-md p-6 rounded-lg text-center cursor-pointer"
                        onClick={() => handleCardClick('solved')}
                    >
                        <h2 className="text-xl font-bold">Solved Tickets</h2>
                        <p className="text-4xl mt-2 text-green-500">{solvedTickets}</p>
                    </div>

                    {/* Unassigned Tickets */}
                    <div
                        className="bg-white shadow-md p-6 rounded-lg text-center cursor-pointer"
                        onClick={() => handleCardClick('unassigned')}
                    >
                        <h2 className="text-xl font-bold">Unassigned Tickets</h2>
                        <p className="text-4xl mt-2 text-red-500">{unassignedTickets}</p>
                    </div>
                </div>

                {/* Show Selected Tickets */}
                {selectedTickets.length > 0 && (
                    <div className="mt-6 bg-white shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">{ticketType}</h2>
                        <ul>
                            {selectedTickets.map(ticket => (
                                <li key={ticket._id} className="mb-2 border-b pb-2">
                                    <p><strong>Ticket ID:</strong> {ticket._id}</p>
                                    <p><strong>Title:</strong> {ticket.title}</p>
                                    <p><strong>Status:</strong> {ticket.status}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/*<button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Done
                </button>*/}
            </div>
        </div>
    );
};

export default Dashboard;
