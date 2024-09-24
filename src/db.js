import { connect } from 'mongoose'
import { DB_URI } from './config/env.config.js'

export async function connectToDatabase() {
    console.log('Conectando a MongoDB Atlas...')
    
    try {
        await connect(DB_URI)

        console.log('Conexión a MongoDB Atlas establecida con éxito!')
    } catch (err) {
        console.error('Error de conexión a MongoDB Atlas:', err)
    }
}