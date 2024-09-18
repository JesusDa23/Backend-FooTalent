import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        rol: {
            type: String,
            required: true,
            enum: ['admin', 'user,'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
)

export default model('User', userSchema)
