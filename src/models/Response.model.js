import mongoose, { Schema, model } from 'mongoose'

const responseSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checklist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    answers: [
        {
            question_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            answer: {
                type: Boolean, // true para "Sí" y false para "No"
                required: true
            }
        }
    ],
    submitted_at: {
        type: Date,
        default: Date.now
    }
})

export default model('Response', responseSchema)
