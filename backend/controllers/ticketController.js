const Ticket = require('../models/Ticket'); // Assuming you have a Ticket model

const getTicketByUser = async (req, res) => {
    const { uid, role, assignedTo } = req.query;
    console.log('Fetching tickets route hit');
    console.log(`UID: ${uid}, Role: ${role}, Assigned To: ${assignedTo}`);

    try {
        let tickets;

        if (role === 'admin' || role === 'support_engineer') {
            // Admins and support engineers see all tickets
            tickets = await Ticket.find({});
        } else if (role === 'customer') {
            // Customers only see their own tickets
            tickets = await Ticket.find({ uid });
        } else if (assignedTo) {
            // If a specific support engineer is assigned
            tickets = await Ticket.find({ assignedSupportEngineer: assignedTo });
        } else {
            return res.status(400).json({ message: 'Invalid role or parameters provided.' });
        }

        console.log('Tickets found:', tickets);
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

const getAllTickets = async (req, res) => {
    console.log('Fetching all tickets route hit');
    
    try {
        // Fetch all tickets from the database, no role or UID filtering
        const tickets = await Ticket.find({});
        console.log('Tickets found:', tickets);  // Debugging output
        res.json(tickets);  // Return all tickets
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createNewTicket = async (req, res) => {
    try {
        const { tid, account, title, description, status, priority, uid } = req.body;

        // Validate required fields
        if (!tid || !account || !title || !description || !status || !priority || !uid) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save the ticket in the database
        const newTicket = new Ticket({
            tid,
            account,
            title,
            description,
            status,
            priority,
            uid,  // UID from Firebase
        });

        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const updateTicket = async (req, res) => {
    const ticketId = req.params.id;
    const { account, title, description, status, priority } = req.body;

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { account, title, description, status, priority },
            { new: true } // Return the updated document
        );
        if (updatedTicket) {
            res.status(200).json(updatedTicket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ticket' });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAssignedTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { supportEngineerId } = req.body;  // UID of the support engineer

    try {
        const ticket = await Ticket.findByIdAndUpdate(ticketId, {
            assignedSupportEngineer: supportEngineerId || 'Not Assigned'
        }, { new: true });

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign support engineer' });
    }
};



module.exports = { getTicketByUser, getAllTickets, getTicketById, createNewTicket, updateTicket, deleteTicket, updateAssignedTicket };