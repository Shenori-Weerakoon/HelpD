const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    tid: { type: String, required: true, index: false },
    account: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['not started', 'in progress', 'stuck', 'done'], default: 'not started', required: true },
    priority: { type: Number, min: 1, max: 5, required: true },
    uid: { type: String, required: true, index: false }, // UID from Firebase
    assignedSupportEngineer: { type: String, default: 'Not Assigned' }
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
