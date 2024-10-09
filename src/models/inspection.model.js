import mongoose, { Schema, model } from 'mongoose';

const InspectionSchema = new Schema(
 {
        vehicleId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle',
            default: null
        },
        estado: {
            type: String,
            enum: ['Pendiente', 'Realizado', 'Vencido'],
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            required: true
        },
        categoria: {
            type: String,
            enum: ['Mecánico', 'Eléctrico'],
            required: true
        },
        coste: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

export default model('Inspeccion', InspectionSchema)