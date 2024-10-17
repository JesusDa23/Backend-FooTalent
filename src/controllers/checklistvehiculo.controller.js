import ChecklistVehiculo from '../models/checkListVehiculo.model.js'
import FormResponse from '../models/FormResponse.model.js'
import Usersubmission from '../models/LastSubmission.model.js'

// TODO: El modelo Vehiculo ya existe y se puede reutilzar para el modelo de checklist
// QUESTION: Este controlador se seguira usando o se eliminara?
const checklist = {}
// Create a new checklist entry
checklist.createChecklist = async (req, res) => {
    try {
        console.log('Request Body:', req.body)
        // Create a new checklist instance with the request body
        const newChecklist = new ChecklistVehiculo({
            tipoVehiculo: req.body.tipoVehiculo || '',
            area: req.body.area || '',
            placa: req.body.placa || '',
            conductor: req.body.conductor || '',
            empresa: req.body.empresa || '',
            fecha: req.body.fecha || new Date(),
            horaInspeccion: req.body.horaInspeccion || '',
            kmInicial: req.body.kmInicial || 0,
            kmFinal: req.body.kmFinal || 0,
            TipoConsumo: req.body.TipoConsumo || '',
            AsientoTrasero: req.body.AsientoTrasero || false,
            sistemaLuces: {
                luzDelanteraAlta:
                    req.body.sistemaLuces.luzDelanteraAlta || false,
                luzDelanteraBaja:
                    req.body.sistemaLuces.luzDelanteraBaja || false,
                lucesEmergencia: req.body.sistemaLuces.lucesEmergencia || false,
                lucesDireccionalesDelanteras:
                    req.body.sistemaLuces.lucesDireccionalesDelanteras || false,
                lucesDireccionalesPosteriores:
                    req.body.sistemaLuces.lucesDireccionalesPosteriores ||
                    false,
                luzReversa: req.body.sistemaLuces.luzReversa || false,
                lucesdeFrenoPosterior:
                    req.body.sistemaLuces.lucesdeFrenoPosterior || false
            },
            parteExterna: {
                parabrisasDelantero:
                    req.body.parteExterna.parabrisasDelantero || false,
                parabrisasPosterior:
                    req.body.parteExterna.parabrisasPosterior || false,
                limpiaparabrisas:
                    req.body.parteExterna.limpiaparabrisas || false,
                sapitos: req.body.parteExterna.sapitos || false,
                niveldeagua: req.body.parteExterna.niveldeagua || false,
                niveldeAceite: req.body.parteExterna.niveldeAceite || false,
                perdidadeFluidosPavimento:
                    req.body.parteExterna.perdidadeFluidosPavimento || false
            },
            parteInterna: {
                tableroEstadoIndicadores:
                    req.body.parteInterna.tableroEstadoIndicadores || false,
                frenoMano: req.body.parteInterna.frenoMano || false,
                frenoServicio: req.body.parteInterna.frenoServicio || false,
                cinturonChofer: req.body.parteInterna.cinturonChofer || false,
                cinturonCopiloto:
                    req.body.parteInterna.cinturonCopiloto || false,
                cinturonPasajeros:
                    req.body.parteInterna.cinturonPasajeros || false,
                espejoRetrovisor:
                    req.body.parteInterna.espejoRetrovisor || false,
                ordenLimpieza: req.body.parteInterna.ordenLimpieza || false,
                direccion: req.body.parteInterna.direccion || false,
                suspension: req.body.parteInterna.suspension || false
            },
            estadoCubiertas: {
                llantaDelanteraDerecha:
                    req.body.estadoCubiertas.llantaDelanteraDerecha || false,
                llantaDelanteraIzquierda:
                    req.body.estadoCubiertas.llantaDelanteraIzquierda || false,
                llantaPosteriorDerecha:
                    req.body.estadoCubiertas.llantaPosteriorDerecha || false,
                llantaPosteriorIzquierda:
                    req.body.estadoCubiertas.llantaPosteriorIzquierda || false,
                llantaRepuesto:
                    req.body.estadoCubiertas.llantaRepuesto || false,
                presionNeumaticos:
                    req.body.estadoCubiertas.presionNeumaticos || false
            },
            accesoriosSeguridad: {
                conosSeguridad:
                    req.body.accesoriosSeguridad.conosSeguridad || false,
                extintor: req.body.accesoriosSeguridad.extintor || false,
                alarmaRetroceso:
                    req.body.accesoriosSeguridad.alarmaRetroceso || false,
                bosina: req.body.accesoriosSeguridad.bosina || false,
                radioComunicacion:
                    req.body.accesoriosSeguridad.radioComunicacion || false,
                linternaMano: req.body.accesoriosSeguridad.linternaMano || false
            },
            tapasyOtros: {
                tapaTanqueGasolina:
                    req.body.tapasyOtros.tapaTanqueGasolina || false,
                gataHidraulica: req.body.tapasyOtros.gataHidraulica || false,
                herramientasPalancaRuedas:
                    req.body.tapasyOtros.herramientasPalancaRuedas || false,
                cablePasaCorriente:
                    req.body.tapasyOtros.cablePasaCorriente || false,
                eslingasZunchos: req.body.tapasyOtros.eslingasZunchos || false,
                OtrasHerramientas:
                    req.body.tapasyOtros.OtrasHerramientas || false
            },
            documentacion: {
                tarjetaPropiedad:
                    req.body.documentacion.tarjetaPropiedad || false,
                PapelesSeguro: req.body.documentacion.PapelesSeguro || false,
                autorizacionTransito:
                    req.body.documentacion.autorizacionTransito || false,
                licenciaConducir:
                    req.body.documentacion.licenciaConducir || false,
                tarjetaGNC: req.body.documentacion.tarjetaGNC || false
            },
            observaciones: req.body.observaciones || '',
            choquesYRaspaduras: req.body.choquesYRaspaduras || '',
            afirmacion: req.body.afirmacion || false
        })

        // Save the checklist to the database
        const savedChecklist = await newChecklist.save()

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Checklist created successfully',
            checklist: savedChecklist
        })
    } catch (error) {
        // Return error response
        return res.status(500).json({
            success: false,
            message: 'Error creating checklist',
            error: error.message
        })
    }
}

// Get all checklist entries
checklist.getAllChecklists = async (req, res) => {
    try {
        const checklists = await ChecklistVehiculo.find()
        res.status(200).json(checklists)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get a checklist entry by ID
checklist.getChecklistById = async (req, res) => {
    try {
        const checklist = await ChecklistVehiculo.findById(req.params.id)
        if (!checklist)
            return res.status(404).json({ message: 'Checklist not found' })
        res.status(200).json(checklist)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update a checklist entry by ID
checklist.updateChecklist = async (req, res) => {
    try {
        const checklist = await ChecklistVehiculo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!checklist)
            return res.status(404).json({ message: 'Checklist not found' })
        res.status(200).json(checklist)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete a checklist entry by ID
checklist.deleteChecklist = async (req, res) => {
    try {
        // Log the ID that is being passed
        console.log('ID to delete:', req.params.id);
        
        const checklist = await ChecklistVehiculo.findByIdAndDelete(req.params.id);
        
        // Log the result of the deletion operation
        console.log('Deleted checklist:', checklist);
        
        if (!checklist) {
            console.log('Checklist not found');
            return res.status(404).json({ message: 'Checklist not found' });
        }

        res.status(204).send();
    } catch (error) {
        // Log the error message
        console.error('Error occurred while deleting checklist:', error.message);
        res.status(500).json({ message: error.message });
    }
}


checklist.listforms = async (req, res) => {
    try {
        const inspections = await FormResponse.find()
        res.status(200).send(inspections)
    } catch (error) {
        console.error('Error fetching data:', error)
        res.status(500).send({ message: 'Error fetching data', error })
    }
}

checklist.listformsave = async (req, res) => {
    try {
        const type = req.body.submissionType
        const userId = req.body.user.id
        const user = req.body.user
        const vehicle = req.body.vehicle
        const lastSubmission = await Usersubmission.findOne({ userId }).sort({
            submissionTime: -1
        })

        // Get the current time and the last submission time
        const now = new Date()
        const threeMinutesAgo = new Date(now.getTime() - 3 * 60 * 1000)

        if (
            lastSubmission &&
            lastSubmission.submissionTime >= threeMinutesAgo
        ) {
            // If last submission is within 3 minutes, do not allow new submission
            console.log(
                'You can only submit once every 3 minutes. Please wait.'
            )
            return {
                success: false,
                message:
                    'You can only submit once every 3 minutes. Please wait.'
            }
        }
        const updatesubmission = new Usersubmission({
            vehicle,
            user,
            userId,
            submissionType: type,
            submissionTime: new Date()
        })
        await updatesubmission.save()

        // Proceed to save the new submission if allowed
        const newSubmission = new FormResponse({
            vehicle,
            user,
            userId,
            submissionType: type, // Ensure you have this in your form data
            sections: req.body.sections, // Form data to save
            submissionTime: new Date()
        })

        // Save the submission to the database
        await newSubmission.save()

        console.log('Submission saved successfully:', newSubmission)
        return {
            success: true,
            message: 'Submission saved successfully!',
            submission: newSubmission
        }
    } catch (error) {
        console.error('Error saving submission:', error)
        return {
            success: false,
            message: 'Internal server error',
            error: error.message
        }
    }
}

export default checklist
