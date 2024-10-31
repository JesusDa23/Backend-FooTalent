import Vehicle from '../models/vehicle.model.js';  // Import the Vehicle model

const vehicles = {}

vehicles.create = async (req, res) => {
    try {
      // Get vehicle data from the request body
      const { make, model, year, vin, plate, color, mileage, status, category} = req.body;
  
      // Validate that required fields are provided
      if (!make || !model || !year || !vin || !plate) {
        return res.status(400).json({ message: 'Marca, modelo, año, placa y VIN son requeridos' });
      }

      const vehicleFound = await Vehicle.findOne({ plate })

      if (vehicleFound) {
        return res.status(400).json({ message: 'Esta placa ya existe' });
      }
  
      // Create a new Vehicle instance using the data from the request
      const newVehicle = new Vehicle({
        make,
        model,
        year,
        vin,
        plate,
        color,
        mileage,
        status,
        category,
      });
  
      // Save the vehicle to the database
      const savedVehicle = await newVehicle.save();
  
      // Respond with success and the saved vehicle data
      return res.status(201).json({
        message: 'Vehiculo creado correctamente',
        vehicle: savedVehicle
      });
  
    } catch (error) {
      // Handle any errors that occur
      console.error('Error creating vehicle:', error);
      return res.status(500).json({
        message: 'Error de servidor. No se pudo crear vehiculo.',
        error: error.message
      });
    }
};

vehicles.list = async (req, res) => {
  try {
    // Check if an ID is provided in the request parameters
    const { id } = req.params;

    if (id) {
      // If an ID is provided, fetch the specific vehicle
      const vehicle = await Vehicle.findById(id);

      // If the vehicle does not exist, return a 404
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehiculo no encontrado' });
      }

      // If the vehicle exists, return it
      return res.status(200).json(vehicle);
    } else {
      // If no ID is provided, fetch all vehicles
      const vehicles = await Vehicle.find();

      // Return the list of all vehicles
      return res.status(200).json(vehicles);
    }
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching vehicle(s):', error);
    return res.status(500).json({
      message: 'Error de servidor, No se pudo completar solicitud.',
      error: error.message,
    });
  }
};

vehicles.update = async (req, res) => {
  try {
    // Extract the vehicle ID from the request parameters
    const { id } = req.params;

    // Check if the vehicle ID is provided
    if (!id) {
      return res.status(400).json({ message: 'ID del vehiculo es requerido.' });
    }

    // Get the update data from the request body
    const updateData = req.body;

    // Find the vehicle by ID and update it
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    // If no vehicle is found with the given ID, return a 404 error
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehiculo no encontrado.' });
    }

    // Return the updated vehicle data
    return res.status(200).json({
      message: 'Vehicle actualizado correctamente',
      vehicle: updatedVehicle
    });
  } catch (error) {
    // Handle any errors that occur
    console.error('Error actualizando vehiculo:', error);
    return res.status(500).json({
      message: 'Error del servidor, No se pudo actualizar.',
      error: error.message,
    });
  }
};

vehicles.delete = async (req, res) => {
    try {
      // Extract the vehicle ID from the request parameters
      const { id } = req.params;
  
      // Check if the vehicle ID is provided
      if (!id) {
        return res.status(400).json({ message: 'ID del vehiculo es necesario.' });
      }
  
      // Find the vehicle by ID and delete it
      const deletedVehicle = await Vehicle.findByIdAndDelete(id);
  
      // If no vehicle is found with the given ID, return a 404 error
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Vehiculo no encontrado.' });
      }
  
      // Return a success message
      return res.status(200).json({
        message: 'Vehiculo eliminado correctamente',
        vehicle: deletedVehicle
      });
    } catch (error) {
      // Handle any errors that occur
      console.error('Error eliminando vehiculo:', error);
      return res.status(500).json({
        message: 'Error de servidor. No se pudo eliminar.',
        error: error.message,
      });
    }
};

export default vehicles