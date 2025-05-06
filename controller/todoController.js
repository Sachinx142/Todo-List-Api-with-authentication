const Todo = require("../models/Todo"); 

// Get all Todos for the authenticated user
const getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id })
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Create a new Todo for the authenticated user
const createTodo = async (req, res) => {
    const { title, description } = req.body;
    console.log("👷 createTodo handler"); 
    console.log("→ req.user in createTodo:", req.user);
    console.log("→ req.body:", req.body);

    if(!title || !description){
        return res.status(400).json({ message: "Title and Description are required" });
    }
    
    try {
        const todo = await Todo.create({
            title,
            description,
            user: req.user.id, // Associate with the authenticated user
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update a Todo for the authenticated user
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: "Not Found" });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// Delete a Todo for the authenticated user
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id, // Ensure the Todo belongs to the user
        });
        if (!todo) return res.status(404).json({ message: "Not Found" });
        res.json({ message: "Todo Has Been Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};