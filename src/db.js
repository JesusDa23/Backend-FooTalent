import { connect } from 'mongoose'

export async function connectToDatabase() {
    try {
        await connect(process.env.DB_URI)

        console.log('Conexión a MongoDB Atlas establecida con éxito!')
    } catch (err) {
        console.error('Error de conexión a MongoDB Atlas:', err)
    }
}
