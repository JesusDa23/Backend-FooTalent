import User from '../models/user.model.js'
import { createToken } from '../utils/createToken.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'

const AuthService = {}

AuthService.login = async (dni, password) => {
    const user = await User.findOne({ dni })

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

        if (userCount === 0) {
            const hashPassword = await encrypt(password)

            const adminPrincipal = new User({
                dni,
                name,
                email,
                password: hashPassword,
                rol
            })

            await adminPrincipal.save()
        }

        const { rol: currentUserRole } = req.user

        if (currentUserRole !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: Solo los administradores pueden registrar usuarios.' })
        }

        if (rol === 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: No puedes registrar otro administrador.' })
        }

        const hashPassword = await encrypt(password)

        const newUser = new User({
            dni,
            name,
            email,
            password: hashPassword,
            rol: 'user'
        })

        await newUser.save()
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

AuthService.profile = async (id) => {
    const user = await User.findById(req.userId)

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

export default AuthService;
