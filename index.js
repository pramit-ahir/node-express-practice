const express = require('express')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/user')
const addressRoute = require('./routes/address')
app.use(express.json())

app.use('/user', userRoute)
app.use('/address', addressRoute)

const PORT = process.env.PORT || 3000
app.get('/health', (req, res) => {
    res.json({ message: 'server is up' })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})