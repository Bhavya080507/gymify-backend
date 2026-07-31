import { Router } from 'express';
import { verifyWebhook, receiveWebhook } from '../controllers/webhook.controller.js';

const router = Router();

router.get('/webhook', verifyWebhook);
router.post('/webhook', receiveWebhook);

export default router;
