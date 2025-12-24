import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { aiLimiter } from '../middleware/rateLimiter';
import { chatWithSupport } from '../controllers/chat.controller';

const router = Router();

// All chat routes require authentication
router.use(authenticate);

// Gemini-powered support assistant
router.post('/support', aiLimiter, chatWithSupport);

export default router;
