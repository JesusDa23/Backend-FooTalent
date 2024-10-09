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
    const { dni, name, email, phone, password, rol } = req.body
    try {
        const user = await AuthService.register(dni, name, email, phone, password, rol)

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

Auth.profile = async (req, res) => {
    console.log(req)
    try {
        const user = await AuthService.profile(req.user.email)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

Auth.getUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.json({
            data: allUsers
        })
    } catch (error) {
        res.json(error)
    }
}

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

Auth.UpdatePassword = async (req, res) => {
    const { dni } = req.params;
    const { password } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ dni }, { password }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }

        res.status(200).json({
            message: 'Contraseña actualizada exitosamente',
            data: updatedUser
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar la contraseña',
            error: error.message
        })
    }
}

export default Auth