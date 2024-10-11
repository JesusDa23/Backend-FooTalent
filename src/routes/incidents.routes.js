import { Router } from 'express'
import IncidentsController from '../controllers/incidents.controller.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router = Router()

router.post('/save', validateJWT, IncidentsController.create)
router.get('/:date', validateJWT, IncidentsController.list)

export default router