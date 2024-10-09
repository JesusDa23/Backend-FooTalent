import { Schema, model } from 'mongoose'

const FormResponseSchema = new Schema({
    user: {
        id: String,
        dni: String,
        name: String,
        email: String,
        phone: String,
        rol: String
    },
    vehicle: {
        make: String,
        model: String,
        plate: String,
        _id: String,
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
    },
    submissionType: {
        type: String,
        default: ""
    }

});

export default model('FormResponse', FormResponseSchema)