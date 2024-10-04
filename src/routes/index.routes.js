import { Router } from 'express'
import VehicleRoutes from './vehicles.routes.js'
import AuthRoutes from './auth.routes.js'
import checklistRoutes from './checklist.routes.js'
import categoryRoutes from './checklistRoutes/category.routes.js'
import sectionRoutes from './checklistRoutes/section.routes.js'
import bulletRoutes from './checklistRoutes/bullet.routes.js'
const routes = Router()

routes.use('/auth', AuthRoutes)
routes.use('/vehicles', VehicleRoutes)
routes.use('/checklist',checklistRoutes)
routes.use('/checklist',categoryRoutes)
routes.use('/checklist',bulletRoutes)
routes.use('/checklist',sectionRoutes)

export default routes