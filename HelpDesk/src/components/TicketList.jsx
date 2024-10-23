import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Firebase authentication
import TicketItem from './TicketItem';
import axios from 'axios';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [uid, setUid] = useState(null);
    const [role, setRole] = useState(null); // Store role here

    // Fetch the current user's UID and role from Firebase
    useEffect(() => {
        const fetchUser = () => {
            const user = auth.currentUser;
            if (user) {
                setUid(user.uid);
            }
        };
        fetchUser();
    }, []);

    // Fetch the user's role from the backend
    useEffect(() => {
        const fetchUserRole = async () => {
            if (uid) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
                    if (response.data && response.data.role) {
                        setRole(response.data.role); // Set the user's role (admin, support_engineer, customer, etc.)
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };
        fetchUserRole();
    }, [uid]); // Fetch the role when `uid` is available

    // Fetch tickets when the user's UID and role are available
    useEffect(() => {
        const fetchTickets = async () => {
            if (uid && role) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/tickets?uid=${uid}&role=${role}`);
                    setTickets(response.data);
                } catch (error) {
                    console.error('Error fetching tickets:', error);
                }
            }
        };
        fetchTickets();
    }, [uid, role]); // Fetch tickets when both `uid` and `role` are available

    // Handle delete action
    const handleDelete = async (ticketId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    // **Handle update action**
    const handleUpdate = (updatedTicket) => {
        setTickets(prevTickets =>
            prevTickets.map(ticket =>
                ticket._id === updatedTicket._id ? updatedTicket : ticket
            )
        );
    };

    return (
        <div>
            {tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <TicketItem
                        key={ticket._id}
                        ticket={ticket}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        role={role}
                    />
                ))
            ) : (
                <p>No tickets to display</p>
            )}
        </div>
    );
};

export default TicketList;
