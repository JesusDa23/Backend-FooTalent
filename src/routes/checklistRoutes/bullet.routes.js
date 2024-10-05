import express from 'express';
import bullet from '../../controllers/checklistcontrollers/bullet.controller.js';

const router = express.Router();

router.post('/bullets', bullet.createBullet);
router.get('/bullets', bullet.getAllBullets);
router.get('/bullets/:id', bullet.getBulletById);
router.put('/bullets/:id', bullet.updateBullet);
router.delete('/bullets/:id', bullet.deleteBullet);
router.get('/sections/:sectionId/bullets', bullet.getBulletsBySection);
router.patch('/bullets/:bulletId/requerido', bullet.updateRequeridoStatus);

export default router 
