const express = require('express')
const Router = express.Router()

const { addUserAddress } = require('./../controllers/address')
const { addAddressvalidation } = require('./../validation/address')
const { verifyToken } = require('../authentication')

Router.post('/', verifyToken, addAddressvalidation, addUserAddress)

module.exports = Router