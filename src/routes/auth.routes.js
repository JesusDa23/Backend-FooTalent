import { Router } from 'express'
import Auth from '../controllers/auth.controller.js'
import { checkAdminRole } from '../middlewares/validate-role.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router  = Router()

router.post('/login', Auth.login)
router.post('/register', validateJWT, checkAdminRole, Auth.register)
router.get('/profile', validateJWT, Auth.profile)
router.get('/users', validateJWT, Auth.getUsers)
router.get('/users/:email', Auth.getUser)
router.delete('/users/:dni', validateJWT, checkAdminRole, Auth.deleteUser)
<<<<<<< HEAD
router.put('/users/:dni/password', Auth.forgotPassword)
router.put('/users/:email/password-for-email', Auth.forgotPasswordForEmail)
router.put('/users/:dni/first-login', Auth.updateFirstLogin);

=======
router.get('/users/:id', validateJWT, Auth.findUser)
router.put('/users/:id', validateJWT, Auth.updateUser)
router.put('/users/:dni/password', validateJWT, Auth.forgotPassword)
router.put('/users/:email/password-for-email',validateJWT, Auth.forgotPasswordForEmail)
>>>>>>> b07048cafcc40b6b12367b1f8cff3af2c38dfa1c

export default router
