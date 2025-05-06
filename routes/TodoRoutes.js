const express = require("express");
const router = express.Router();
const {getTodo,createTodo,updateTodo,deleteTodo} = require("../controller/todoController")
const protect = require("../middleware/authMiddleware")

router.get('/',protect,getTodo)
router.post('/',protect,createTodo)
router.put('/:id',protect,updateTodo)
router.delete('/:id',protect,deleteTodo)

module.exports = router