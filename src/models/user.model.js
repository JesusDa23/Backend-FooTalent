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
            // select: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        licencia: {
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
        isFirstLogin: {
            type: Boolean,
            required: true,
            default: true
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export default model('User', userSchema)
