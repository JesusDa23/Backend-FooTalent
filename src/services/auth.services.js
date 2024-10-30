import User from '../models/user.model.js'
import { createToken } from '../utils/createToken.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'
import NotificationController from '../controllers/notification.controller.js'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config.js'
const AuthService = {}

const tokenpassreset = ""

AuthService.login = async (email, password) => {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    console.log(user)

    if (user.lockUntil && user.lockUntil < Date.now()) {
        user.failedLoginAttempts = 0;
        user.lockUntil = null;
        await user.save();
    }

    const isCorrect = await verified(password, user.password)
    if (!isCorrect) {
        user.failedLoginAttempts++

        if (user.failedLoginAttempts >= 5) {
            user.lockUntil = new Date(Date.now() + 30 * 60 * 1000) // 30 minutos
            await user.save();
            throw new Error('Demasiados intentos fallidos. Cuenta bloqueada')
        }

        await user.save();
        throw new Error('Contraseña incorrecta')
    } else {
        user.failedLoginAttempts = 0;
        user.lockUntil = null;
        await user.save();
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
            rol: user.rol,
            imageUrl: user.imageUrl,
            status: user.status
        },
        token,
        message: 'Inicio de sesión exitoso'
    }
}

// aca agregue los datos adicionales que se estan pidiendo
AuthService.register = async (dni, name, email, phone, address, password, licencia, type_licence, isFirstLogin, rol, status) => {
    try {
        const userCount = await User.countDocuments()

        if (userCount === 0) rol = 'admin'

        // Verifica si el correo ya existe
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            res.json({
                result: "Unsuccessful"
            })
            throw new Error('Correo ya en uso'); // Error específico para el correo
        }
        
        // Verifica si el DNI ya existe
        const dniExists = await User.findOne({ dni });
        if (dniExists) {
            throw new Error('DNI ya en uso'); // Error específico para el DNI
        }

        // Verifica si el teléfono ya existe
        const phoneExists = await User.findOne({ phone });
        if (phoneExists) {
            throw new Error('Teléfono ya en uso'); // Error específico para el teléfono
        }

        // Encriptar la contraseña
        const hashPassword = await encrypt(password)

        // Crear el nuevo usuario
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
            rol,
            status,
        })

        // Guardar el nuevo usuario en la base de datos
        const user = await newUser.save()

        // Enviar email de bienvenida
        NotificationController.sendEmail(
            email,
            'Bienvenido a Fleet Management',
            `Hola ${name}, te damos la bienvenida a nuestra plataforma. Tu contraseña provisional es: ${password}`
        )

        // Devolver los datos del usuario creado
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
                rol: user.rol,
                status: user.status,
                imageUrl: user.imageUrl,
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
        rol: user.rol,
        status: user.status,
        imageUrl: user.imageUrl,
        
    }
}

AuthService.forgotPasswordForEmailService = async (email) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const tokenChangePassword = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        console.log('tokenChangePassword:', tokenChangePassword);

        // Pass tokenChangePassword to sendEmailResetPassword
        await NotificationController.sendEmailResetPassword(
            email,
            'Restablecer contraseña',
            `Hola ${user.name}, Si desea cambiar su contraseña, haga clic en el botón de abajo.`,
            tokenChangePassword
        );

        return tokenChangePassword;

    } catch (error) {
        console.log('error:', error);
        throw new Error(error.message); // Re-throw the error for the controller to handle
    }
};


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
                rol: user.rol,
                imageUrl: user.imageUrl,
                status: user.status,
            },
            message: 'Contraseña actualizada exitosamente'
        };
    } catch (error) {
        console.log("error:", error);

        throw new Error(error.message); // Lanza el error para que el controlador lo gestione
    }
}



export default AuthService
