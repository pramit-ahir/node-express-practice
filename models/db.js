const { Sequelize } = require('sequelize')
const DB_NAME = process.env.DB_NAME
const DB_USER_NAME = process.env.DB_USER_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
})

sequelize
    .authenticate()
    .then(() => console.log('db connected'))
    .catch((err) => console.error('unable to connect to the databases', err))

module.exports = sequelize