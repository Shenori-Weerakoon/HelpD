// routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const {getTicketByUser, getAllTickets, getTicketById, createNewTicket, updateTicket, deleteTicket, updateAssignedTicket} = require('../controllers/ticketController')

router.get('/', getTicketByUser);
router.get('/all-tickets', getAllTickets);
router.get('/:id', getTicketById);
router.post('/', createNewTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.put('/:ticketId/assign', updateAssignedTicket);

/*router.get('/', async (req, res) => {
    const { uid, role } = req.query;
    console.log('Fetching tickets route hit');
    console.log(`UID: ${uid}, Role: ${role}`);
    

    try {
        let tickets;
        if (role === 'admin' || role === 'support_engineer') {
            tickets = await Ticket.find({});  // Admin and support engineers see all tickets
        } else {
            tickets = await Ticket.find({ uid });  // Customers only see their own tickets
        }
        console.log('Tickets found:', tickets);  // Debugging output
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
});*/

/*router.get('/', async (req, res) => {
    try {
        const engineerId = req.query.assignedSupportEngineer;
        console.log(`Fetching tickets route hit`);
        console.log(`UID: ${engineerId}`);
        if (!engineerId) {
            return res.status(400).json({ error: 'Support engineer ID is required' });
        }
        
        const tickets = await Ticket.find({ assignedSupportEngineer: engineerId });
        console.log(tickets); // Log the tickets to see if they exist
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tickets for the engineer' });
    }
});*/

module.exports = router;
