import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TicketDetailsPage = () => {
    const [ticket, setTicket] = useState(null);
    const { id } = useParams();  // Use useParams to get route parameters

    useEffect(() => {
        // Fetch ticket details from the backend API using id
        // For now, we'll use a static ticket object
        setTicket({
            id: id,
            title: 'Issue with Login',
            description: 'I am unable to log in to my account.',
            status: 'Open',
            priority: 'High',
            comments: [
                { id: 1, content: 'We are looking into it.', createdBy: 'Support Engineer' },
                { id: 2, content: 'Please try resetting your password.', createdBy: 'Support Engineer' },
            ],
        });
    }, [id]);

    return (
        <div>
            {ticket ? (
                <>
                    <h1>{ticket.title}</h1>
                    <p>{ticket.description}</p>
                    <p>Status: {ticket.status}</p>
                    <p>Priority: {ticket.priority}</p>
                    <h2>Comments</h2>
                    <ul>
                        {ticket.comments.map((comment) => (
                            <li key={comment.id}>
                                <p>{comment.content}</p>
                                <p>By: {comment.createdBy}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TicketDetailsPage;
