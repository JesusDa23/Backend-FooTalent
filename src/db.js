import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const dbUri = process.env.DB_URI

export async function connectToDatabase() {
    try {
        await mongoose.connect(dbUri)

        console.log('Conexión a MongoDB Atlas establecida con éxito!')
    } catch (err) {
        console.error('Error de conexión a MongoDB Atlas:', err)
    }
}
