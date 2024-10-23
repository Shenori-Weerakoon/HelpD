import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TicketItem = ({ ticket, onDelete, onUpdate, role }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTicket, setUpdatedTicket] = useState({
        account: ticket.account,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
    });
    const [assignedEngineer, setAssignedEngineer] = useState(ticket.assignedSupportEngineer);
    const [supportEngineers, setSupportEngineers] = useState([]);

    useEffect(() => {
        // Fetch all support engineers for admin to select from
        const fetchSupportEngineers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users?role=support_engineer');
                setSupportEngineers(response.data);
            } catch (error) {
                console.error('Error fetching support engineers:', error);
            }
        };

        if (role === 'admin'){
            fetchSupportEngineers();
        }
        
    }, [role]);

    const handleAssignEngineer = async (e) => {
        const supportEngineerId = e.target.value;
        setAssignedEngineer(supportEngineerId);

        try {
            const response = await axios.put(`http://localhost:5000/api/tickets/${ticket._id}/assign`, { supportEngineerId });
            onUpdate(response.data); // Update the ticket in parent state
        } catch (error) {
            console.error('Error assigning support engineer:', error);
        }
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTicket({ ...updatedTicket, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/tickets/${ticket._id}`, updatedTicket);
            console.log('Ticket updated:', response.data);
            setIsEditing(false); // Close the form after updating
            onUpdate(response.data); // Update the ticket in parent state
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md">
            {isEditing ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        name="account"
                        value={updatedTicket.account}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <input
                        type="text"
                        name="title"
                        value={updatedTicket.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <textarea
                        name="description"
                        value={updatedTicket.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <select
                        name="status"
                        value={updatedTicket.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="stuck">Stuck</option>
                        <option value="done">Done</option>
                    </select>
                    <input
                        type="number"
                        name="priority"
                        value={updatedTicket.priority}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                    <div className="flex space-x-2">
                        <button 
                            onClick={handleUpdate} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Update
                        </button>
                        <button 
                            onClick={() => setIsEditing(false)} 
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-semibold">{ticket.account}</h2>
                    <h3 className="text-md font-bold">{ticket.title}</h3>
                    <p className="text-gray-700">{ticket.description}</p>
                    <p className="text-gray-500">Status: {ticket.status}</p>
                    <p className="text-gray-500">Priority: {ticket.priority}</p>
                    <p className="text-gray-500">Assigned Engineer: {assignedEngineer || 'Not Assigned'}</p>

                    {role === 'admin' && (
                        <select 
                            value={assignedEngineer} 
                            onChange={handleAssignEngineer} 
                            className="w-full border border-gray-300 p-2 rounded-md mt-2"
                        >
                            <option value="Not Assigned">Not Assigned</option>
                            {supportEngineers.map(engineer => (
                                <option key={engineer.uid} value={engineer.uid}>
                                    {engineer.email}
                                </option>
                            ))}
                        </select>
                    )}

                    <div className="flex space-x-2 mt-4">
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => onDelete(ticket._id)} 
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// PropTypes validation
TicketItem.propTypes = {
    ticket: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        account: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
        assignedSupportEngineer: PropTypes.string, // This field is optional
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired, // Added onUpdate prop validation
    role: PropTypes.string.isRequired,
};

export default TicketItem;
