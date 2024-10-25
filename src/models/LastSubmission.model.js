import mongoose, { Schema, model } from "mongoose";


const UsersubmissionSchema = new Schema({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
      },
      submissionType: {
        type: String,
        required: true
      },
      submissionTime: {
        type: Date,
        default: Date.now
      },
  });

  export default model('Usersubmission', UsersubmissionSchema);