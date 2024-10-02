import { Schema, model } from 'mongoose'

const checklistVehiculoSchema = new Schema({
    tipoVehiculo: { type: String, required: true },
    area: { type: String, required: true },
    placa: { type: String, required: true },
    conductor: { type: String, required: true },
    empresa: { type: String, required: true },
    fecha: { type: Date, required: true },
    horaInspeccion: { type: String, required: true },
    kmInicial: { type: Number, required: true },
    kmFinal: { type: Number, required: true },
    TipoConsumo: { 
        type: String, 
        enum: ['Gas', 'Gasolina', 'Electrico'],
        required: true
    },
    AsientoTrasero: { 
        type: Boolean, 
        required: true
    },
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
        lucesDireccionalesDelanteras: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        lucesDireccionalesPosteriores: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        luzReversa: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        lucesdeFrenoPosterior: { 
            type: String, 
            enum: ['B', 'M', 'NA'], 
            required: true 
        }
    },
    parteExterna: {
        parabrisasDelantero: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        parabrisasPosterior: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        limpiaparabrisas: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        sapitos: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        niveldeagua: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        niveldeAceite: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        perdidadeFluidosPavimento: {
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
        frenoMano: { 
            type: String, 
            enum: ['B', 'M', 'NA'], 
            required: true 
        },
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
        cinturonCopiloto: {
            type: String,
            enum: ['B', 'M', 'NA'],
        },
        cinturonPasajeros: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        espejoRetrovisor: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        ordenLimpieza: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        direccion: { 
            type: String, 
            enum: ['B', 'M', 'NA'], 
            required: true 
        },
        suspension: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        }
    },
    estadoCubiertas: {
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
        },
        presionNeumaticos: {
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
        extintor: { 
            type: String, 
            enum: ['B', 'M', 'NA'], 
            required: true 
        },
        alarmaRetroceso: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        bosina: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },

        
        
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
    tapasyOtros:{
        
        tapaTanqueGasolina: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        
        gataHidraulica: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        herramientasPalancaRuedas: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        cablePasaCorriente: { 
            type: String, 
            enum: ['B', 'M', 'NA'], 
            required: true 
        },
        eslingasZunchos: { 
            type: String, 
            enum: ['B', 'M', 'NA'], 
            required: true 
        },
        OtrasHerramientas: { 
            type: String, 
            enum: ['B', 'M', 'NA'], 
            required: true 
        },
    },

    documentacion: {
        tarjetaPropiedad: {
            type: String,
            enum: ['B', 'M', 'NA'],
            required: true
        },
        PapelesSeguro: { 
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
        },
        tarjetaGNC: { 
            type: String, 
            enum: ['B', 'M', 'NA'],  
        },
    },
    observaciones: { type: String, default: '' },
    choquesYRaspaduras: { type: String, default: '' },
    afirmacion: { type: Boolean, default: false }
}, { timestamps: true })

export default model('ChecklistVehiculo', checklistVehiculoSchema)