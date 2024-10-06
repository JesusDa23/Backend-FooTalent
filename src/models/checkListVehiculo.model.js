import { json } from 'express';
import { Schema, model } from 'mongoose'

const checklistVehiculoSchema = new Schema({
    Vehiculo: { type: String, required: true },
    placa: { type: String, required: true },
    conductor: { type: String, required: true },
    kmInicial: { type: Number, required: true },
    formlist: {
        type: String,
        required:false
    },
    
}, { timestamps: true });


export default model('ChecklistVehiculo', checklistVehiculoSchema)