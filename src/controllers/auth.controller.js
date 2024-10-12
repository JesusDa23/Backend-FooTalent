import AuthService from '../services/auth.services.js'
import NotificationController from './notification.controller.js'
import User from '../models/user.model.js'

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

Auth.forgotPasswordForEmail = async (req, res) => {
    const { email } = req.params

    try {
        const tokenUser = await AuthService.forgotPasswordForEmailService(email);
        res.status(200).json(tokenUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// aca puse los datos adicionales que se estan pidiendo 
Auth.register = async (req, res) => {
    const { dni, name, email, phone, password, licencia, address, isFirstLogin, rol } = req.body
    try {
        const user = await AuthService.register(dni, name, email, phone, password, licencia, address, isFirstLogin, rol)

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
// Este es el controlador original antes de hacerle cambios, lo deje comentado por si acaso :v
// Auth.register = async (req, res) => {
//     const { dni, name, email, phone, password, rol } = req.body
//     try {
//         const user = await AuthService.register(dni, name, email, phone, password, rol)

//         NotificationController.sendEmail(
//             email,
//             'Bienvenido a Footalent',
//             'Gracias por registrarte en Footalent'
//         )
//         res.status(201).json(user)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }



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
        const { id } = req.params

        if (id) {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: "no encontrado" });
            }

            console.log(user)
            res.status(200).json(user)
        } else {
            res.status(400).json({ message: "no Id enviado" });
        }
    } catch (error) {
        res.json(error)
    }
}

Auth.getUser = async (req, res) => {
    try {
        const dataUser = await User.findOne({ email: req.params.email })
        const users = await User.find({});

        if (!users) {
            return res.status(404).json({ message: "Users not found" });
        }

        res.json({
            dataUser
        })
    } catch (error) {
        res.json(error)
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
    const { oldPassword, newPassword, forEmail } = req.body

    try {
        const user = await AuthService.forgotPassword(dni, oldPassword, newPassword, forEmail)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
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
        console.log('error:', error)
        res.status(500).json({ error: 'Error al actualizar isFirstLogin' });
    }
};


Auth.forgotPasswordForEmail = async (req, res) => {
    const { email } = req.params
Auth.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, dni, phone, email, address, licence, type_licence, expiration_licence } = req.body; // Extract data from request body

    try {
        const tokenUser = await AuthService.forgotPasswordForEmail(email)
        res.status(200).json(tokenUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

Auth.forgotPassword = async (req, res) => {
    const { dni } = req.params
    const { oldPassword, newPassword, forEmail } = req.body

    try {
        const user = await AuthService.forgotPassword(dni, oldPassword, newPassword, forEmail)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
};


export default Auth