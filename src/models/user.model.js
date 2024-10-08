import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        dni: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        rol: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user'
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export default model('User', userSchema)
