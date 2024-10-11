import { Schema, model } from 'mongoose'

const incidentsSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    vehicleStateDescription: {
        type: String,
        required: true
    }
});

export default model('Incidents', incidentsSchema)