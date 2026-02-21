import express from 'express';
import {
  getApplications,
  createApplication,
  updateApplicationStatus,
  getApplicationById,
} from '../controllers/applicationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getApplications);
router.post('/', createApplication);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplicationStatus);

export default router;
