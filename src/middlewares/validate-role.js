export const checkAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Acceso denegado: debe iniciar sesión primero.' });
    }

    const { rol } = req.user;

    if (rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden hacer esto.' });
    }

    next();
};