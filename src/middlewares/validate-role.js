export const checkAdminRole = (req, res, next) => {
    if (req.user.rol === 'admin') {
        next()
    } else {
        return res.status(403).json({ error: 'Acceso denegado' })
    }
}
