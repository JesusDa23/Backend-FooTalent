import express from 'express';
import bullet from '../../controllers/checklistcontrollers/bullet.controller.js';

const router = express.Router();

router.post('/bullets', bullet.createBullet);
router.get('/bullets', bullet.getAllBullets);
router.get('/bullets/:id', bullet.getBulletById);
router.put('/bullets/:id', bullet.updateBullet);
router.delete('/bullets/:id', bullet.deleteBullet);

export default router 
