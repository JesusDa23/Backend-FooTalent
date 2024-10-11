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

export default InspeccionController;
