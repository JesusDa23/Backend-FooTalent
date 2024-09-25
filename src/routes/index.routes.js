import { Router } from 'express'
import AuthRoutes from './auth.routes.js'
import notificationRoutes from './notification.routes.js';
const routes = Router()

routes.use('/auth', AuthRoutes)
routes.use('/notifications', notificationRoutes);

export default routes