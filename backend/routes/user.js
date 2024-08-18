const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/userController')

//login route 
router.post('/login', loginUser)


//register a user  
router.post('/register', registerUser)


module.exports = router 