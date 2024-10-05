import { Router } from 'express'
import Auth from '../controllers/auth.controller.js'
import { checkAdminRole } from '../middlewares/validate-role.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router = Router()

router.post('/login', Auth.login)
router.post('/register', validateJWT, checkAdminRole, Auth.register)
router.post('/logout', Auth.logout)
router.get('/profile', validateJWT, Auth.profile)
router.get('/users', validateJWT, Auth.getUsers)

export default router
