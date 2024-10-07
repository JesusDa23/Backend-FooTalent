import express from 'express';
import category from '../../controllers/checklistcontrollers/category.controller.js';

const router = express.Router();

router.post('/categories', category.createCategory);
router.get('/getCategories', category.getAllCategories);
router.get('/categories/:id', category.getCategoryById);
router.put('/categories/:id', category.updateCategory);
router.delete('/categories/:id', category.deleteCategory);

export default router