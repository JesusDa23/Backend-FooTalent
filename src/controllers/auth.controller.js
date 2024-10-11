import AuthService from '../services/auth.services.js'
import NotificationController from './notification.controller.js'
import User from '../models/user.model.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'

const Auth = {}

Auth.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await AuthService.login(email, password)

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// aca puse los datos adicionales que se estan pidiendo 
Auth.register = async (req, res) => {
    const { dni, name, email, phone, address, password, licencia, type_licence, isFirstLogin, rol } = req.body
    try {
        const user = await AuthService.register(dni, name, email, phone, address, password, licencia, type_licence, isFirstLogin, rol)

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


Auth.readUser = async (req, res) => {
    const { dni } = req.params;
    try {
        const user = await User.findById(dni);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


Auth.logout = async (req, res) => {
    res.send('logout')
}

Auth.profile = async (req, res) => {
    console.log(req)
    try {
        const user = await AuthService.profile(req.user.email)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

Auth.findUser = async (req, res) => {
    try {
        const { dni } = req.params

        if (dni) {
            const user = await User.findOne({ dni });
            if (user) {
                console.log("Success");
            } else {
                res.status(404).json({ message: "no encontrado", error: error.message });
            }
        } else {
            res.status(400).json({ message: "no DNI  enviado", error: error.message });
        }


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

Auth.getUsers = async (req, res) => {
    try {
        const userId = req.params.id;

        // If an ID is provided, find the specific user; otherwise, get all users
        const users = userId ? await User.findById(userId) : await User.find();

        // If a user is not found (only in case an ID is provided), return a 404 response
        if (userId && !users) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            data: users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


Auth.deleteUser = async (req, res) => {
    const { dni } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ dni });

        if (!deletedUser) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }

        res.status(200).json({
            message: 'Usuario eliminado exitosamente',
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};

Auth.forgotPassword = async (req, res) => {
    const { dni } = req.params
    const { oldPassword, newPassword } = req.body

    try {
        const user = await AuthService.forgotPassword(dni, oldPassword, newPassword)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

Auth.updateFirstLogin = async (req, res) => {
    const { dni } = req.params;
    const { isFirstLogin } = req.body;

    try {
        const user = await User.findOneAndUpdate({ dni }, { isFirstLogin }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({
            message: 'isFirstLogin actualizado exitosamente',
            user
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar isFirstLogin' });
    }
};


export default Auth
