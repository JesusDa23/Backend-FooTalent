import mongoose, { Schema, model } from 'mongoose';

const BulletSchema = new Schema({
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requerido: {
        type: Boolean,
        required: true,
        
    },
    code: {
        type: String,
        unique: true,
        default: () => `BUL-${Date.now()}` // Auto-generates a unique code
    }
}, { timestamps: true });

export default model('Bullet', BulletSchema);