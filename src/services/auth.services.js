import User from '../models/user.model.js'
import { createToken } from '../utils/createToken.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'
import NotificationController from '../controllers/notification.controller.js'
const AuthService = {}

AuthService.login = async (dni, password) => {
    const user = await User.findOne({ dni }).select('+password')
    if (!user) {
        throw new Error('Usuario no encontrado')
    }
    const isCorrect = await verified(password, user.password)
    if (!isCorrect) {
        throw new Error('Contraseña incorrecta')
    }

    const token = createToken({ email: user.email, rol: user.rol })

    return {
        user: {
            id: user.id,
            dni: user.dni,
            name: user.name,
            email: user.email,
            phone: user.phone,
            rol: user.rol
        },
        token,
        message: 'Inicio de sesión exitoso'
    }
}

AuthService.register = async (dni, name, email, phone, password, rol) => {
    try {
        const userCount = await User.countDocuments()

        if (userCount === 0) rol = 'admin'

        const userExists = await User.findOne({
            $or: [{ dni }, { email }]
        })

        if (userExists) {
            throw new Error('Usuario existente')
        }
        const hashPassword = await encrypt(password)

        const newUser = new User({
            dni,
            name,
            email,
            phone,
            password: hashPassword,
            rol
        })

        const user = await newUser.save()
        NotificationController.sendEmail(
            email,
            'Bienvenido a Fleet Management',
            `Hola ${name}, te damos la bienvenida a nuestra plataforma. Tu contraseña provisional es: ${password}`
        )
        return {
            user: {
                id: user.id,
                dni: user.dni,
                name: user.name,
                email: user.email,
                phone: user.phone,
                rol: user.rol
            },
            message: 'Usuario creado exitosamente'
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

AuthService.profile = async email => {
    // const user = await User.findById(req.userId)
    // ? Por qué no se usa el id que se recibe como parametro?
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('User not found')
    }

    return {
        id: user.id,
        dni: user.dni,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.rol
    }
}

AuthService.forgotPassword = async (dni, oldPassword, newPassword) => {
    try {
        const user = await User.findOne({ dni });
        
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }
    
        const isMatch = await verified(oldPassword, user.password);
    
        if (!isMatch) {
            return res.status(400).json({
                message: 'La contraseña anterior es incorrecta',
            });
        }
    
        const hashedPassword = await encrypt(newPassword);
    
        user.password = hashedPassword;
        
        await user.save();

        return {
            user: {
                id: user.id,
                dni: user.dni,
                name: user.name,
                email: user.email,
                phone: user.phone,
                rol: user.rol
            },
            message: 'Usuario creado exitosamente'
        }
    }
    catch (error) {
        throw new Error(error.message)
    }  
}

export default AuthService
