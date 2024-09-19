import { Router } from 'express'
import AuthRoutes from './auth.routes.js'
const routes = Router()

routes.use('/auth', AuthRoutes)

export default routes
