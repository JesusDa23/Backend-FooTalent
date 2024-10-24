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
    console.log(user)

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
            rol: user.rol,
            imageUrl: user.imageUrl,
        },
        token,
        message: 'Inicio de sesión exitoso'
    }
}

// aca agregue los datos adicionales que se estan pidiendo
AuthService.register = async (dni, name, email, phone, address, password, licencia, type_licence, isFirstLogin, rol) => {
    try {
        const userCount = await User.countDocuments()

        if (userCount === 0) rol = 'admin'

        // Verifica si el correo ya existe
        const emailExists = await User.findOne({ email });
        if (emailExists) {
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
            rol
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
        imageUrl: user.imageUrl,
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
            `
              <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                <h1 style="color: #2c3e50;">Hola ${user.name},</h1>
                <p style="font-size: 16px;">
                  Si desea cambiar su contraseña, por favor haga clic en el botón de abajo:
                </p>
                
                <a href="http://localhost:4200/change-password-for-email/${tokenChangePassword}" 
                   style="
                     display: inline-block;
                     padding: 10px 20px;
                     font-size: 18px;
                     color: #ffffff;
                     background-color: #007bff;
                     text-decoration: none;
                     border-radius: 5px;
                     margin-top: 20px;
                   ">
                   Cambiar contraseña
                </a>
                
                <p style="font-size: 14px; color: #888; margin-top: 20px;">
                  Si no solicitaste este cambio, puedes ignorar este correo.
                </p>
              </div>
            `
        );



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
                rol: user.rol,
                imageUrl: user.imageUrl,
            },
            message: 'Contraseña actualizada exitosamente'
        };
    } catch (error) {
        console.log("error:", error);

        throw new Error(error.message); // Lanza el error para que el controlador lo gestione
    }
}



export default AuthService
