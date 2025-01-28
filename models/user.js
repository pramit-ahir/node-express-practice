const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.DECIMAL
    },
    email: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    isActive:{
        type: DataTypes.BOOLEAN
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    birthDate: {
        type: DataTypes.DATE
    },
    gender: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
})

module.exports = User