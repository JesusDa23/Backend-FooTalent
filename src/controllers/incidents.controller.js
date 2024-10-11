import IncidentsModel from "../models/incidents.model.js";
import userModel from "../models/user.model.js";
import NotificationController from "./notification.controller.js";

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

        userModel.find({ rol: 'admin' }).then((users) => {
            users.forEach((user) => {
                NotificationController.sendReport(
                    user.email,
                    'Nuevo Incidente',
                    'Se ha registrado un nuevo incidente'
                );
            });
        });

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