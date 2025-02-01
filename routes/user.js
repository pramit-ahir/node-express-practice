const express = require('express')
const Router = express.Router()
const { addUser, loginUser, updateUser, getUser } = require('./../controllers/user')
const { addUserValidation, loginValidation, updateUserValidation } = require('./../validation/user')
const { verifyToken } = require('./../authentication/index')

Router.post('/', addUserValidation, addUser)
Router.post('/login', loginValidation, loginUser)
Router.put('/', verifyToken, updateUserValidation, updateUser)
Router.get('/', verifyToken, getUser)

module.exports = Router