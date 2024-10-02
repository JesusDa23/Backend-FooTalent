import AuthService from '../services/auth.services.js'
import NotificationController from './notification.controller.js'
import User from '../models/user.model.js'

const Auth = {}

Auth.login = async (req, res) => {
    const { dni, password } = req.body
    try {
        const user = await AuthService.login(dni, password)

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

Auth.register = async (req, res) => {
    const { dni, name, email, password, rol } = req.body
    try {
        const user = await AuthService.register(dni, name, email, password, rol)

        NotificationController.sendEmail(
            email,
            'Bienvenido a Footalent',
            'Gracias por registrarte en Footalent'
        )
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

Auth.logout = async (req, res) => {
    res.send('logout')
}

Auth.profile = async (req, res) => {
    try {
        const user = await AuthService.profile(req.user.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

Auth.getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json({
            data: allUsers
        });
    } catch (error) {
        respuesta.json(error);
    }
}


export default Auth