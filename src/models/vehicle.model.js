import mongoose, { Schema, model } from 'mongoose';


// Define the vehicle schema
const vehicleSchema = new Schema({
  make: {
    type: String,
    required: true,  // The make of the vehicle (e.g., Toyota, Ford)
  },
  model: {
    type: String,
    required: true,  // The model of the vehicle (e.g., Corolla, Mustang)
  },
  year: {
    type: Number,
    required: true,  // The manufacturing year of the vehicle
    min: 1876,       // The first car was invented in 1886
  },
  vin: {
    type: String,
    required: true,  // Vehicle Identification Number (unique identifier)
    unique: true,    // Ensure no two vehicles have the same VIN
  },
  plate: {
    type: String,
    required: true,  // License plate of the vehicle
  },
  color: {
    type: String,    // The color of the vehicle
  },
  mileage: {
    type: Number,    // Total distance the vehicle has traveled
    default: 0,      // Default mileage is 0 for new vehicles
  },
  owner: {
    type: String,    // Name of the vehicle owner
  },
  status: {
    type: String,
    enum: ['Ocupado', 'Disponible', 'Reparacion', 'Deshabilitado' ], // Vehicle status options
    default: 'Disponible',  // Default status is 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically set the date when the vehicle is added
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
});


export default model('Vehicle', vehicleSchema);
