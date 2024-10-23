import { useNavigate } from 'react-router-dom';
import TicketForm from '../../components/TicketForm';
import { auth } from '../../firebase'; // Import Firebase auth to get the logged-in user
import Navbar from '../../components/Navbar';


const CreateTicketPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (ticketData) => {
        try {
            const uid = auth.currentUser?.uid;  // Get the current user's UID
            
            if (!uid) {
                console.error('No UID found. User might not be authenticated.');
                return;
            }

            const requestBody = { ...ticketData, uid }; // Construct the request body
            console.log('Request Body:', requestBody);  // Log the request body
    
            const response = await fetch('http://localhost:5000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (response.ok) {
                const createdTicket = await response.json();
                console.log('Ticket Created:', createdTicket);
                // Optionally, navigate to another page or stay on the form for creating another ticket
            } else {
                console.error('Failed to create ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-6">Create Ticket</h2>
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <TicketForm onSubmit={handleSubmit} />
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

export default CreateTicketPage;
