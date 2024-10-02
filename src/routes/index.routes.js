import { Router } from 'express'
import VehicleRoutes from './vehicles.routes.js'
import AuthRoutes from './auth.routes.js'
import checklistRoutes from './checklist.routes.js'
const routes = Router()

routes.use('/auth', AuthRoutes)
routes.use('/vehicles', VehicleRoutes)
routes.use('/checklist',checklistRoutes)

export default routes