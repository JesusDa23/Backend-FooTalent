import { Router } from 'express'
import ChecklistController from '../controllers/Checklist.controller.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
const router = Router()
router.use(validateJWT)

router.post('/', ChecklistController.create)
router.get('/', ChecklistController.getAll)
router.put('/:id', ChecklistController.update)
router.get('/:id', ChecklistController.getById)
router.get('/:id/responses', ChecklistController.getResponsesByChecklistId)
router.get('/:id/questions', ChecklistController.getQuestionsByChecklistId)
router.post('/submit', ChecklistController.submitChecklist)

export default router
