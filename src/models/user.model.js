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
            required: true
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
        type_licence: {
            type: String,
            enum: [
                'comun',
                'especial'
            ],
            default: 'comun'
        },
        expiration_licence: {
            type: Date,
            default: Date.now
        },
        imageUrl: {
            type: String,
            default: 'https://cdn.icon-icons.com/icons2/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png',
            required: false
        },
        failedLoginAttempts: {
            type: Number,
            default: 0
        },
        lockUntil: {
            type: Date,
            default: null
        },
        status: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
)

export default model('User', userSchema)
