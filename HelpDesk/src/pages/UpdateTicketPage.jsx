import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';


const UpdateTicketPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/tickets/${id}`);
                if (response.ok) {
                    const ticketData = await response.json();
                    setTicket(ticketData);
                } else {
                    console.error('Failed to fetch ticket:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching ticket:', error);
            }
        };

        fetchTicket();
    }, [id]);

    const handleSubmit = async (updatedTicketData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTicketData),
            });

            if (response.ok) {
                console.log('Ticket Updated:', await response.json());
                navigate('/view-tickets'); // Redirect to the tickets list or another page
            } else {
                console.error('Failed to update ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Update Ticket</h2>
            <TicketForm ticket={ticket} onSubmit={handleSubmit} />
        </div>
    );
};

export default UpdateTicketPage;
