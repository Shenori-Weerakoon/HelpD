// servim
const connectDB = require('./db');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Ticket = require('./models/Ticket');
// Drop the unique index on the 'uid' field if it exists
Ticket.collection.dropIndex('uid_1', function(err, result) {
    if (err) {
        console.error('Error dropping unique index on uid:', err.message);
    } else {
        console.log('Successfully dropped the unique index on uid');
    }
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();



// Routes
const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

//const userTicketsRoute = require('./routes/userTicketsRoute');
//app.use('api/userTickets', userTicketsRoute);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
