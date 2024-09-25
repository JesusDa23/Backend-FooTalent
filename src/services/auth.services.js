import User from '../models/user.model.js'
import { createToken } from '../utils/createToken.js'
import { encrypt, verified } from '../utils/bcryp.handler.js'

const AuthService = {}
AuthService.login = async (dni, password) => {
    try {
        // Find user by DNI
        const user = await User.findOne({ dni });


        // If user not found, return a response
        if (!user) {
            return {
                success: false,
                message: 'Usuario no encontrado'
            };
        }


        // Verify if the password is correct
        const isCorrect = await verified(password, user.password);


        // If password is incorrect, return a response
        if (!isCorrect) {
            return {
                success: false,
                message: 'Credenciales inválidas'
            };
        }


        // Create token for the user
        const token = createToken({ id: user.id, rol: user.rol });


        // Return user data and token
        return {
            success: true,
            user: {
                id: user.id,
                dni: user.dni,
                name: user.name,
                email: user.email,
                rol: user.rol
            },
            token,
            message: 'Inicio de sesión exitoso'
        };
    } catch (error) {
        // Catch any unexpected errors
        return {
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        };
    }
};


AuthService.register = async (dni, name, email, password, rol) => {
    try {
        // Check if this is the first user and assign 'admin' role if necessary
        const userCount = await User.countDocuments();
        if (userCount === 0) rol = 'admin';

        // Check if a user with the same DNI already exists
        const userExists = await User.findOne({ dni });

        if (userExists) {
            // Return a response indicating the user already exists
            return {
                success: false,
                message: 'El usuario con este DNI ya está registrado.'
            };
        }
        // Encrypt the password
        const hashPassword = await encrypt(password);

        // Create a new user
        const newUser = new User({
            dni,
            name,
            email,
            password: hashPassword,
            rol
        });


        // Save the new user to the database
        const user = await newUser.save();

        console.log("usuario creado exitosamente");
        // Return the created user data with a success message
        return {
            
            success: true,
            user: {
                id: user.id,
                dni: user.dni,
                name: user.name,
                email: user.email,
                rol: user.rol
            },
            message: 'Usuario creado exitosamente.'
        };
    } catch (error) {
        console.log("error al crear usuario");
        // Handle any unexpected errors
        return {
            success: false,
            message: 'Error al registrar el usuario.',
            error: error.message
        };
    }
};


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

export default AuthService