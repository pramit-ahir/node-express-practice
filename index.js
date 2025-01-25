const express = require('express')
const app = express()

const PORT = 3000
app.get('/health', (req, res) => {
    res.json({ message: 'server is up' })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})