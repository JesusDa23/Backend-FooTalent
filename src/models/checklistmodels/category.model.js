import mongoose, { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

export default model('Category', categorySchema);
