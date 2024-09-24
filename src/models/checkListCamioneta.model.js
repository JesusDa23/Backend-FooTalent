import { Schema, model } from 'mongoose'

const checklistCamionetaSchema = new Schema({
    tipoVehiculo: { type: String, required: true },
    area: { type: String, required: true },
    placa: { type: String, required: true },
    conductor: { type: String, required: true },
    empresa: { type: String, required: true },
    fecha: { type: Date, required: true },
    horaInspeccion: { type: String, required: true },
    kmInicial: { type: Number, required: true },
    kmFinal: { type: Number, required: true },
    sistemaLuces: {
        luzDelanteraAlta: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        luzDelanteraBaja: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        lucesEmergencia: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        lucesNeblineros: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        lucesDireccionalesDelanteras: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        lucesDireccionalesPosteriores: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        }
    },
    parteExterna: {
        parabrisasDelantera: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        parabrisasPosterior: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        vidriosVentanas: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        espejosLaterales: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        tapaTanqueCombustible: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        carroceriaEstado: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        }
    },
    parteInterna: {
        tableroEstadoIndicadores: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        frenoMano: { type: String, enum: ['B', 'M', 'NA'], required: true },
        frenoServicio: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        cinturonChofer: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        cinturonPasajeros: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        ordenLimpieza: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        direccion: { type: String, enum: ['B', 'M', 'NA'], required: true },
        claxon: { type: String, enum: ['B', 'M', 'NA'], required: true },
        asientos: { type: String, enum: ['B', 'M', 'NA'], required: true },
        aireAcondicionado: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        }
    },
    estadoLlantas: {
        llantaDelanteraDerecha: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        llantaDelanteraIzquierda: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        llantaPosteriorDerecha: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        llantaPosteriorIzquierda: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        llantaRepuesto: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        }
    },
    accesoriosSeguridad: {
        conosSeguridad: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        extintor: { type: String, enum: ['B', 'M', 'NA'], required: true },
        gataHidraulica: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        cableCadenaEstrobo: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        cuñasSeguridad: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        herramientasPalancaRuedas: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        botiquin: { type: String, enum: ['B', 'M', 'NA'], required: true },
        radioComunicacion: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        linternaMano: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        }
    },
    documentacion: {
        tarjetaPropiedad: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        SOAT: { type: String, enum: ['B', 'M', 'NA'], required: true },
        inspeccionTecnicaVehicular: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        autorizacionTransito: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        licenciaConducir: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        }
    },
    observaciones: { type: String, default: '' },
    choquesYRaspaduras: { type: String, default: '' },
    afirmacion: { type: Boolean, default: false }
}, { timestamps: true })

export default model('ChecklistCamioneta', checklistCamionetaSchema)