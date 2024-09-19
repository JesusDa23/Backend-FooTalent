import AuthService from '../services/auth.services.js'

export default function executeRegister() {
    let executed = false
    let result = null

    if (!executed) {
        result = AuthService.register('33.892.323', 'Bruno Jular', 'bjular@mix-group.com.ar', 'Teclado25', 'admin')
        executed = true
    }

    return result
}
