export default function executeRegister() {
    let executed = false;
    let result = null;

    if (!executed) {
        result = AuthService.register('', '', '', '', 'admin');
        executed = true;
    }
    
    return result;
}