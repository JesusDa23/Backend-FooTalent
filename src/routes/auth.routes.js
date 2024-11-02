import { Router } from 'express'
import Auth from '../controllers/auth.controller.js'
import { checkAdminRole } from '../middlewares/validate-role.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { upload } from '../utils/uploadImage.js'

const router = Router()

router.post('/login', Auth.login)
router.post('/register', validateJWT, checkAdminRole, Auth.register)
router.get('/profile', validateJWT, Auth.profile)
router.get('/users', validateJWT, Auth.getUsers)
router.delete('/users/:dni', validateJWT, checkAdminRole, Auth.deleteUser)
router.get('/users/:id', Auth.findUser)
router.get('/users-email/:email', Auth.findUserByEmail)
router.put('/users/:id', validateJWT, Auth.updateUser)
router.put('/users/:id/password', Auth.forgotPassword)
router.put('/users/:email/password-for-email', Auth.forgotPasswordForEmail)
router.put('/users/:id/first-login', Auth.updateFirstLogin)
router.put('/users/:id/image', upload.single('file'), Auth.updateUserImage)

export default router
