const bcrypt = require('bcrypt')
const User = require('./../models/user')

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

module.exports = { addUser }