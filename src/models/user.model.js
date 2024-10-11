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
        },
        licence: {
            type: String,
            default: ''
        },
        type_licence: {
            type: String,
            default: '',
            enum: [
                'A1',
                'A2',
                'A3',
                'A4',
                'A5',
                'B1',
                'B2',
                'B3',
                'B4',
                'B5',
                'C1',
                'C2',
                'C3',
                'C4',
                'C5',
                'D1',
                'D2',
                'D3',
                'D4',
                'D5'
            ]
        },
        expiration_licence: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
)

export default model('User', userSchema)
