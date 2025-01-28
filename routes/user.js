const express = require('express')
const Router = express.Router()
const { addUser } = require('./../controllers/user')
const { addUserValidation } = require('./../validation/user')

Router.post('/', addUserValidation, addUser)

module.exports = Router