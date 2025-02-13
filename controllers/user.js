const bcrypt = require('bcrypt')
const User = require('./../models/user')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")
const Address = require('../models/address')


async function addUser(req, res) {
    try {
        const data = req.body
        const isExist = await User.findOne({
            where: { email: data.email }
        })
        if (isExist) {
            return res.status(400).json({ message: "User already created with this email" })
        }
        data.isActive = true
        data.password = await bcrypt.hash(data.password, 10)
        await User.create(data)
        res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
        res.status(500).json({ message: "unable to add user" })
    }
}

async function loginUser(req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        const isExist = await User.findOne({ where: { email } })
        if (!isExist) {
            return res.status(400).json({ message: 'user not found with this email' })
        }
        const isPasswordValid = await bcrypt.compare(password, isExist.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        const token = jwt.sign(
            { id: isExist.id, email: isExist.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        )
        res.json({
            message: 'Login successful',
            token,
            user: { id: isExist.id, email: isExist.email }
        })
    } catch (error) {
        res.status(500).json({ message: "error while login" })
    }
}

async function updateUser(req, res) {
    try {
        const id = req.user.id
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let phoneNumber = req.body.phoneNumber
        let birthDate = req.body.birthDate
        let gender = req.body.gender
        const updateData = {}
        if (firstName) {
            updateData.firstName = firstName
        }
        if (lastName) {
            updateData.lastName = lastName
        }
        if (phoneNumber) {
            updateData.phoneNumber = phoneNumber
        }
        if (birthDate) {
            updateData.birthDate = birthDate
        }
        if (gender) {
            updateData.gender = gender
        }
        await User.update(
            updateData, { where: { id } }
        )
        res.json({ message: 'user updated successfully' })

    } catch (error) {
        res.status(500).json({ message: "error while update" })

    }
}

async function getUser(req, res) {
    try {
        let id = req.user.id
        const user = await User.findOne({ where: { id } })
        delete user.dataValues.password
        delete user.dataValues.updatedAt
        const address = await Address.findOne({ where: { userId: id },
        "attributes":["street", "postalCode", "country", "city","state"] })
        user.dataValues.address = address

        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "something went wrong while fetching the user" })
    }
}

async function getUsers(req, res) {
    try {
        let page = req.query.page || 1
        let limit = req.query.limit || 10
        let gender = req.query.gender
        let email = req.query.email
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page - 1) * limit
        const query = {}
        if (gender) {
            query.gender = gender
        }
        if (email) {
            query.email = { [Op.like]: `%${email}%` }
        }
        const totalUsers = await User.count({ where: query })

        const users = await User.findAll({
            where: query, limit, offset,
            attributes: ["id", "email", "firstName", "lastName", "gender", "birthDate", "phoneNumber"]
        })
        res.json({ data: users, count: totalUsers })
    } catch (err) {
        res.status(500).json({ message: "something went wrong while fetching the users" })
    }
}

module.exports = { addUser, loginUser, updateUser, getUser, getUsers }