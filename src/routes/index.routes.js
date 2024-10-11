import { Router } from 'express'
import VehicleRoutes from './vehicles.routes.js'
import AuthRoutes from './auth.routes.js'
import checklistRoutes from './checklist.routes.js'
import categoryRoutes from './checklistRoutes/category.routes.js'
import sectionRoutes from './checklistRoutes/section.routes.js'
import bulletRoutes from './checklistRoutes/bullet.routes.js'
import EmailRoutes from './email.routes.js'
import InspectionRoutes from './inspection.routes.js'
import IncidentsRoutes from './incidents.routes.js'

const routes = Router()

routes.use('/auth', AuthRoutes)
routes.use('/vehicles', VehicleRoutes)
routes.use('/checklist', checklistRoutes)
routes.use('/checklist', categoryRoutes)
routes.use('/checklist', bulletRoutes)
routes.use('/checklist', sectionRoutes)
routes.use('/email', EmailRoutes)
routes.use('/mantenimiento', InspectionRoutes)
routes.use('/incidents', IncidentsRoutes)

export default routes