import express from 'express';
import section from '../../controllers/checklistcontrollers/section.controller.js';

const router = express.Router();

router.post('/sections', section.createSection);
router.get('/sections', section.getAllSections);
router.get('/sections/:id', section.getSectionById);
router.put('/sections/:id', section.updateSection);
router.delete('/sectionsdel/:id', section.deleteSection);
router.get('/sections/category/:categoryId', section.getSectionsByCategory);


export default router
