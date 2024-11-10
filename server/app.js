const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const mongoConnect = require('./db/connection');
const router = require('./routes/routers');
const authrouter = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoConnect();

// Routes
app.use(router);
app.use(authrouter);

// Serve static files for user uploads
app.use('/uploads/users', express.static('uploads/users'));

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
