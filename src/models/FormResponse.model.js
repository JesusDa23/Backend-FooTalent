import { Schema, model } from 'mongoose'

const FormResponseSchema = new Schema({
    user: {
        id: String,
        dni: String,
        name: String,
        email: String,
        rol: String
    },
    vehicle: {
        make: String,
        model: String,
        year: Number,
        licensePlate: String
    },
    sections: [
        {
            sectionName: String,
            bullets: [
                {
                    bulletName: String,
                    response: Boolean
                }
            ]
        }
    ],
    submissionTime: {
        type: Date,
        default: Date.now  // Automatically add the current timestamp
    }
});

export default model('FormResponse', FormResponseSchema)