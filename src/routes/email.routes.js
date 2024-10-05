import { Router } from 'express'
import User from '../models/user.model.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
const routes = Router()

// verify account with link token
routes.get('/verify/:token', (req, res) => {
    try {
        const { token } = req.params
        const isValid = validateJWT(token)
        if (isValid) {
            const { id } = req.user
            User.findOneAndUpdate({ id: id }, { active: true })
            return res.json({ message: 'Account verified' })
        }
        return res.json({ message: 'Invalid token' })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})

routes.post('/reset-password', (req, res) => {
    try {
        const { password } = req.body
        const { id } = req.user

        User.findByIdAndUpdate(id, { password })
        return res.json({ message: 'Password updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }
})
