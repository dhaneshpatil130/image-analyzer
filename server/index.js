const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
require("dotenv").config();
require("./models/db");

const PORT = process.env.PORT || 5000;

app.get('/ping',(req,res)=>{
  res.send('pong')
})

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);


// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error(`Error occurred: ${err.message}`);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1); // Exit the application
  }
});
