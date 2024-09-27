import { Router } from 'express'
import VehicleRoutes from './vehicles.routes.js'
import AuthRoutes from './auth.routes.js'
const routes = Router()

routes.use('/auth', AuthRoutes)
routes.use('/vehicles', VehicleRoutes)

export default routes