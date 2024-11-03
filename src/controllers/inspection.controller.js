import InspeccionModel from '../models/inspection.model.js';  

const InspeccionController = {};

// Crear una nueva inspección
InspeccionController.create = async (req, res) => {
    try {
        const nuevaInspeccion = new InspeccionModel(req.body); 
        const inspeccionGuardada = await nuevaInspeccion.save();
        res.status(201).json(inspeccionGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Listar todas las inspecciones o una inspección específica
InspeccionController.list = async (req, res) => {
    try {
        if (req.params.vehicleId) {
            const inspeccion = await InspeccionModel.findById(req.params.vehicleId); 
            if (!inspeccion) {
                return res.status(404).json({ message: 'Inspección no encontrada' });
            }
            res.status(201).json(inspeccion);
        } else {
            const inspecciones = await InspeccionModel.find(); 
            res.status(201).json(inspecciones);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una inspección
InspeccionController.update = async (req, res) => {
    try {
        const inspeccionActualizada = await InspeccionModel.findByIdAndUpdate( 
            req.params.id,
            req.body,
            { new: true }
        );
        if (!inspeccionActualizada) {
            return res.status(404).json({ message: 'Inspección no encontrada' });
        }
        res.status(200).json(inspeccionActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una inspección
InspeccionController.delete = async (req, res) => { 
    try {
        const inspeccionEliminada = await InspeccionModel.findByIdAndDelete(req.params.id);  
        if (!inspeccionEliminada) {
            return res.status(404).json({ message: 'Inspección no encontrada' });
        }
        res.status(200).json({ message: 'Inspección eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

InspeccionController.getFormResponseByVehicleId = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        // Convert vehicleId to ObjectId before querying
        const mongoose = require('mongoose');
        const vehicleIdObject = mongoose.Types.ObjectId(vehicleId); // Ensure this is an ObjectId

        // Query for documents where vehicle._id matches the provided vehicleId
        const formResponse = await FormResponse.findOne({ 'vehicle._id': vehicleIdObject })
            .select('user.name submissionTime') // Retrieve only the driver's name and submission date
            .exec();

        // Log the vehicle ID being searched for
        console.log(`Searching for vehicle ID: ${vehicleIdObject}`);

        // If no record is found, return a 404 response
        if (!formResponse) {
            console.error(`No form response found for vehicle ID: ${vehicleId}`);
            return res.status(404).json({ message: 'No form response found for this vehicle ID' });
        }

        // Log the retrieved formResponse before sending it
        console.log('Retrieved formResponse:', formResponse);

        // Send the retrieved data as a JSON response
        res.json({
            driverName: formResponse.user.name,
            submissionDate: formResponse.submissionTime
        });
    } catch (error) {
        console.error('Error retrieving form response:', error);
        res.status(500).json({ message: 'Server error while retrieving form response' });
    }
};

export default InspeccionController;
