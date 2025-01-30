const express = require('express')
const Router = express.Router()
const { addUser, loginUser } = require('./../controllers/user')
const { addUserValidation, loginValidation } = require('./../validation/user')

Router.post('/', addUserValidation, addUser)
Router.post('/login', loginValidation, loginUser)

module.exports = Router