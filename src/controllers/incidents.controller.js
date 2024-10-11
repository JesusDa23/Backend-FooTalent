import IncidentsModel from "../models/incidents.model.js";

const IncidentsController = {};

IncidentsController.create = async (req, res) => {
    const { date, description, passengers, vehicleStateDescription } = req.body;
    
    try {
        const nuevoIncidente = new IncidentsModel({
            date,
            description,
            passengers,
            vehicleStateDescription
        }); 

        const incidenteGuardado = await nuevoIncidente.save();

        res.status(201).json(incidenteGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

IncidentsController.list = async (req, res) => {
    const { date } = req.params;

    try {
        const incidente = await IncidentsModel.find({ date });
        
        if (!incidente) {
            return res.status(404).json({ message: 'Incidente no encontrado' });
        }

        res.status(201).json(incidente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default IncidentsController;