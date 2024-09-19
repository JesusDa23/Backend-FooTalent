import User from '../models/user.model.js'
import { createToken } from '../utils/createToken.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'

const AuthService = {}

AuthService.login = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Usuario no encontrado')
    }
    const isCorrect = await verified(password, user.password)
    if (!isCorrect) {
        throw new Error('Invalid credentials')
    }
    const token = createToken({ id: user.id, rol: user.rol })
    console.log(user)
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol
        },
        token,
        message: 'Inicio de sesión exitoso'
    }
}

AuthService.register = async (name, email, password, rol) => {
    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new Error('Usuario existente')
    }

    const hashPassword = await encrypt(password)

    const newUser = new User({
        name,
        email,
        password: hashPassword,
        rol
    })

    const user = await newUser.save()

    const token = createToken({ id: user.id, rol: user.rol })
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol
        },
        token,
        message: 'Usuario creado exitosamente'
    }
}

AuthService.profile = async id => {
    const user = await User.findById(req.userId)

    if (!user) {
        throw new Error('User not found')
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
}

export default AuthService
