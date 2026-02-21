import express from 'express';
import { getProfile, updateProfile, uploadResume } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getProfile);
router.put('/', updateProfile);
router.post('/resume', uploadResume);

export default router;
