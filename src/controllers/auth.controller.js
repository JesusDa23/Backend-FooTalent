import AuthService from '../services/auth.services.js';
const Auth = {};

Auth.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthService.login(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

Auth.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await AuthService.register(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

Auth.logout = async (req, res) => {
    res.send('Hello from logout');
};

Auth.profile = async (req, res) => {
    try {
        const user = await AuthService.profile(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

Auth.registerGoogle = async (req, res) => {
    try {
        const user = await AuthService.registerGoogle(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default Auth;
