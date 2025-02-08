const express = require('express')
const Router = express.Router()
const { addUser, loginUser, updateUser, getUser, getUsers } = require('./../controllers/user')
const { addUserValidation, loginValidation, updateUserValidation, userListValidation } = require('./../validation/user')
const { verifyToken } = require('./../authentication/index')

Router.post('/', addUserValidation, addUser)
Router.post('/login', loginValidation, loginUser)
Router.put('/', verifyToken, updateUserValidation, updateUser)
Router.get('/', verifyToken, getUser)
Router.get('/list', verifyToken, userListValidation, getUsers)

module.exports = Router
