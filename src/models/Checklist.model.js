import mongoose, { Schema, model } from 'mongoose'

const checklistSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        questions: [
            {
                category: {
                    type: String,
                    required: true
                },
                question: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

export default model('Checklist', checklistSchema)
