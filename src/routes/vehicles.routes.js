import { Router } from 'express' 
import Vehicles from '../controllers/vehicles.controller.js'
import { checkAdminRole } from '../middlewares/validate-role.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router = Router()

router.post("/save",Vehicles.create)
router.get("/rtv",Vehicles.list)
router.get("/rtv/:id",Vehicles.list)
router.put("/update/:id",Vehicles.update)
router.delete("/del/:id",Vehicles.delete)

export default router 
