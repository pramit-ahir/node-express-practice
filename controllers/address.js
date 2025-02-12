const Address = require('./../models/address')

async function addUserAddress(req, res) {
    try {
        const data = req.body
        data.userId = req.user.id
        await Address.create(data)
        res.json({ message: "address added succesfully" })
    } catch (err) {
        res.status(500).json({ message: "error while adding user address" })
    }
}



module.exports = { addUserAddress }