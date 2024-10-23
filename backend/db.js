// blog_app/config/db.js

const mongoose = require('mongoose');

const connectDB =() =>{
  const url = "mongodb+srv://rakhitha:pJhMPJ7VLQ1SnO1o@helpdesk.3s4no.mongodb.net/?retryWrites=true&w=majority&appName=HelpDesk";

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}

module.exports = connectDB;