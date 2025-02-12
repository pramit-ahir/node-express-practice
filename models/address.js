const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.DECIMAL,
        autoIncrement: true,
        primaryKey: true,
    }, userId: {
        type: DataTypes.DECIMAL
    }, street: {
        type: DataTypes.STRING
    }, city: {
        type: DataTypes.STRING
    }, state: {
        type: DataTypes.STRING
    }, postalCode: {
        type: DataTypes.STRING
    }, country: {
        type: DataTypes.STRING
    },
}, {
    timestamps: true,
    tableName: "Address"
}
)

module.exports = Address