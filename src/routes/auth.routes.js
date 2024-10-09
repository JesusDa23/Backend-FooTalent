import { Router } from 'express'
import Auth from '../controllers/auth.controller.js'
import { checkAdminRole } from '../middlewares/validate-role.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router = Router()

router.post('/login', Auth.login)
router.post('/register', validateJWT, checkAdminRole, Auth.register)
router.get('/profile', validateJWT, Auth.profile)
router.get('/users', validateJWT, Auth.getUsers)
router.delete('/users/:dni', validateJWT, checkAdminRole, Auth.deleteUser)
router.put('/users/:dni/password', validateJWT, Auth.UpdatePassword)

export default router
