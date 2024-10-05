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
    TipoConsumo: { type: String, enum: ['Gas', 'Gasolina', 'Electrico'], required: true },
    AsientoTrasero: { type: Boolean, required: true },
    sistemaLuces: {
        luzDelanteraAlta: { type: Boolean, required: true },
        luzDelanteraBaja: { type: Boolean, required: true },
        lucesEmergencia: { type: Boolean, required: true },
        lucesDireccionalesDelanteras: { type: Boolean, required: true },
        lucesDireccionalesPosteriores: { type: Boolean, required: true },
        luzReversa: { type: Boolean, required: true },
        lucesdeFrenoPosterior: { type: Boolean, required: true }
    },
    parteExterna: {
        parabrisasDelantero: { type: Boolean, required: true },
        parabrisasPosterior: { type: Boolean, required: true },
        limpiaparabrisas: { type: Boolean, required: true },
        sapitos: { type: Boolean, required: true },
        niveldeagua: { type: Boolean, required: true },
        niveldeAceite: { type: Boolean, required: true },
        perdidadeFluidosPavimento: { type: Boolean, required: true }
    },
    parteInterna: {
        tableroEstadoIndicadores: { type: Boolean, required: true },
        frenoMano: { type: Boolean, required: true },
        frenoServicio: { type: Boolean, required: true },
        cinturonChofer: { type: Boolean, required: true },
        cinturonCopiloto: { type: Boolean },
        cinturonPasajeros: { type: Boolean, required: true },
        espejoRetrovisor: { type: Boolean, required: true },
        ordenLimpieza: { type: Boolean, required: true },
        direccion: { type: Boolean, required: true },
        suspension: { type: Boolean, required: true }
    },
    estadoCubiertas: {
        llantaDelanteraDerecha: { type: Boolean, required: true },
        llantaDelanteraIzquierda: { type: Boolean, required: true },
        llantaPosteriorDerecha: { type: Boolean, required: true },
        llantaPosteriorIzquierda: { type: Boolean, required: true },
        llantaRepuesto: { type: Boolean, required: true },
        presionNeumaticos: { type: Boolean, required: true }
    },
    accesoriosSeguridad: {
        conosSeguridad: { type: Boolean, required: true },
        extintor: { type: Boolean, required: true },
        alarmaRetroceso: { type: Boolean, required: true },
        bosina: { type: Boolean, required: true },
        radioComunicacion: { type: Boolean, required: true },
        linternaMano: { type: Boolean, required: true }
    },
    tapasyOtros: {
        tapaTanqueGasolina: { type: Boolean, required: true },
        gataHidraulica: { type: Boolean, required: true },
        herramientasPalancaRuedas: { type: Boolean, required: true },
        cablePasaCorriente: { type: Boolean, required: true },
        eslingasZunchos: { type: Boolean, required: true },
        OtrasHerramientas: { type: Boolean, required: true }
    },
    documentacion: {
        tarjetaPropiedad: { type: Boolean, required: true },
        PapelesSeguro: { type: Boolean, required: true },
        autorizacionTransito: { type: Boolean, required: true },
        licenciaConducir: { type: Boolean, required: true },
        tarjetaGNC: { type: Boolean }
    },
    observaciones: { type: String, default: '' },
    choquesYRaspaduras: { type: String, default: '' },
    afirmacion: { type: Boolean, default: false }
}, { timestamps: true });


export default model('ChecklistVehiculo', checklistVehiculoSchema)