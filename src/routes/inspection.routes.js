import { Router } from 'express' 
import InspeccionController from '../controllers/inspection.controller.js'

const router = Router()

router.post("/", InspeccionController.create)
router.get("/", InspeccionController.list)
router.get("/:id", InspeccionController.list)
router.get('/form-response/vehicle/:vehicleId', InspeccionController.getFormResponseByVehicleId);
router.put("/:id", InspeccionController.update)
router.delete("/:id", InspeccionController.delete)

export default router 
