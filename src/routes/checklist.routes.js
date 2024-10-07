// routes/vehicleRoutes.js
import express from 'express';
import checklist  from '../controllers/checklistvehiculo.controller.js';

const router = express.Router();

// Create a new checklist
router.post('/save', checklist.createChecklist);

// Get all checklists
router.get('/list', checklist.getAllChecklists);

// Get a checklist by ID
router.get('/list/:id', checklist.getChecklistById);

// Update a checklist by ID
router.put('/:id', checklist.updateChecklist);

// Delete a checklist by ID
router.delete('/del/:id', checklist.deleteChecklist);

router.get('/inspectionForms', checklist.listforms);

router.post('/inspectionForms', checklist.listformsave);

export default router;
