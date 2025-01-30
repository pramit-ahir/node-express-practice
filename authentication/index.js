const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization token is required' })
        }

        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Invalid authorization token format' })
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        req.user = decoded

        next()
    } catch (error) {
        console.error('Token verification failed:', error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' })
        }
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = { verifyToken }
