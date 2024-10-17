export const checkAdminRole = (req, res, next) => {
    const { rol } = req.user

    if (rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden hacer esto.' })
    }

    next()
}