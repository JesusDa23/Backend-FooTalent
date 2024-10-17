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

Auth.signup = async (req, res) => {
    try {
        const { dni, name, email, phone, address, password, licencia, type_licence, isFirstLogin, rol } = req.body;
        const hashPassword = await encrypt(password)
        const userCount = await User.countDocuments()

        const newUser = new User({
            dni,
            name,
            email,
            phone,
            address,
            licencia,
            type_licence,
            password: hashPassword,
            isFirstLogin,
            rol
        })

        if (userCount === 0) rol = 'admin'

        const userExists = await User.findOne({
            $or: [{ dni }, { email }]
        })

        if (userExists) {
            throw new Error('Usuario existente')
        }

        const user = await newUser.save()
        NotificationController.sendEmail(
            email,
            'Bienvenido a Fleet Management',
            `Hola ${name}, te damos la bienvenida a nuestra plataforma. Tu contraseña provisional es: ${password}`
        )
        res.status(201).json(user)

        return {
            user: {
                id: user.id,
                dni: user.dni,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                licencia: user.licencia,
                type_licence: user.type_licence,
                isFirstLogin: user.isFirstLogin,
                rol: user.rol
            },
            message: 'Usuario creado exitosamente'
        }

    } catch (error) {
        
        throw new Error(error.message)
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
        res.status(500).json({ error: error.message });
    }
}

Auth.findUserByEmail = async (req, res) => {
    try {
        const { email } = req.params

        if (email) {
            const user = await User.find({email});
            
            if (!user) {
                return res.status(404).json({ message: "no encontrado" });
            }

            console.log(user)
            res.status(200).json(user)
        } else {
            res.status(400).json({ message: "no Id enviado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

Auth.getUsers = async (req, res) => {
    try {
        const users = await User.find({});

        if (!users) {
            return res.status(404).json({ message: "Users not found" });
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

Auth.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, dni, phone, email, address, rol, licence, type_licence, expiration_licence } = req.body; // Extract data from request body

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, dni, phone, email, address, rol, licence, type_licence, expiration_licence }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
}

Auth.updateFirstLogin = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    console.log(req.body);

    const firstLogin = req.body.isFirstLogin
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { isFirstLogin: firstLogin }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: 'Error updating user', error: error.message });
    }

}

Auth.forgotPassword = async (req, res) => {
    const { id } = req.params
    const { oldPassword, newPassword, forEmail } = req.body

    try {
        const user = await AuthService.forgotPassword(id, oldPassword, newPassword, forEmail)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
};


export default Auth
