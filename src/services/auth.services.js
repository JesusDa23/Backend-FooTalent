import User from '../models/user.model.js'
import { createToken } from '../utils/createToken.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'

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
            rol: user.rol
        },
        token,
        message: 'Inicio de sesión exitoso'
    }
}

AuthService.register = async (dni, name, email, password, rol) => {
    try {
        const userCount = await User.countDocuments()

        if (userCount === 0) rol = 'admin'

        const userExists = await User.findOne({ dni })

        if (userExists) {
            throw new Error('Usuario existente')
        }

        const hashPassword = await encrypt(password)

        const newUser = new User({
            dni,
            name,
            email,
            password: hashPassword,
            rol
        })

        const user = await newUser.save()

        return {
            user: {
                id: user.id,
                dni: user.dni,
                name: user.name,
                email: user.email,
                rol: user.rol
            },
            message: 'Usuario creado exitosamente'
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

AuthService.profile = async (email) => {
    // const user = await User.findById(req.userId)
    // ? Por qué no se usa el id que se recibe como parametro?
    const user = await User.findById(email)

    if (!user) {
        throw new Error('User not found')
    }

    return {
        id: user.id,
        dni: user.dni,
        name: user.name,
        email: user.email,
        role: user.rol
    }
}

export default AuthService
