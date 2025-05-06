const express = require("express");
const router = express.Router();
const {login,register} = require("../controller/authController")
const protect = require('../middleware/authMiddleware')

router.post('/register',register)
router.post('/login',login)

router.get('/profile',protect,(req,res)=>{
    res.send({message:`Welcome,${req.user.name}`})
})

module.exports = router;