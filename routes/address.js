const express = require('express')
const Router = express.Router()

const { addUserAddress, getUserAddress } = require('./../controllers/address')
const { addAddressvalidation } = require('./../validation/address')
const { verifyToken } = require('../authentication')

Router.post('/', verifyToken, addAddressvalidation, addUserAddress)
Router.get('/', verifyToken, getUserAddress)

module.exports = Router