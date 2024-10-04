import mongoose, { Schema, model } from 'mongoose';

const sectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

export default model('Section', sectionSchema);
