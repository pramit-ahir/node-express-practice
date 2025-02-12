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

async function getUserAddress(req, res) {
    try {
        let id = req.user.id
        const userAddress = await Address.findAll({
            where: { userId: id },
            attributes: ["id", "street", "postalCode", "country", "city", "state"]
        })
        res.json({ data: userAddress })
    } catch (err) {
        res.status(500).json({ message: 'error while fetching user address' })
    }
}



module.exports = { addUserAddress, getUserAddress }