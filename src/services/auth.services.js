import User from '../models/user.model.js'
import { createToken } from '../utils/createToken.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'
import NotificationController from '../controllers/notification.controller.js'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config.js'
const AuthService = {}

AuthService.login = async (email, password) => {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new Error('Usuario no encontrado')
    }
    const isCorrect = await verified(password, user.password)
    if (!isCorrect) {
        throw new Error('Contraseña incorrecta')
    }

    const token = createToken({ email: user.email, rol: user.rol, id: user.id })

    return {
        user: {
            id: user.id,
            dni: user.dni,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            licencia: user.licencia,
            isFirstLogin: user.isFirstLogin,
            rol: user.rol
        },
        token,
        message: 'Inicio de sesión exitoso'
    }
}

// aca agregue los datos adicionales que se estan pidiendo
AuthService.register = async (dni, name, email, phone, address, password, licencia, type_licence, rol) => {
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
            address,
            licencia,
            type_licence,
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

AuthService.forgotPasswordForEmailService = async (email) => {
    try {
        // Busca el usuario por su DNI
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const tokenChangePassword = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        console.log('tokenChangePassword:', tokenChangePassword)

        NotificationController.sendEmail(
            email,
            'Mensaje de olvide contraseña',
            `Hola ${user.name}, si desea cambiar su contraseña, por favor ingrese al siguiente enlace: http://localhost:4200/change-password-for-email/${tokenChangePassword}`
        )

        return tokenChangePassword

    } catch (error) {
        console.log('error:', error)
        throw new Error(error.message); // Lanza el error para que el controlador lo gestione
    }
}

AuthService.forgotPassword = async (_id, oldPassword, newPassword, forEmail = false) => {
    try {
        // Busca el usuario por su DNI
        const user = await User.findOne({ _id });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (forEmail == false) {
            // Verifica si la contraseña anterior coincide con la almacenada
            const isMatch = await verified(oldPassword, user.password);

            if (!isMatch) {
                throw new Error('La contraseña anterior es incorrecta');
            }
        }

        // Encripta la nueva contraseña
        const hashedPassword = await encrypt(newPassword);

        // Actualiza la contraseña en la base de datos
        user.password = hashedPassword;
        await User.findByIdAndUpdate(user._id, user);

        return {
            user: {
                id: user.id,
                dni: user.dni,
                name: user.name,
                email: user.email,
                phone: user.phone,
                rol: user.rol
            },
            message: 'Contraseña actualizada exitosamente'
        };
    } catch (error) {
        console.log("error:", error);
        
        throw new Error(error.message); // Lanza el error para que el controlador lo gestione
    }
}



export default AuthService
