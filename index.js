const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require('./routes/TodoRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON Data in bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));