import { Request, Response } from 'express';
import { env } from '../config/env.js';

export const verifyWebhook = (req: Request, res: Response): void => {
  const mode = req.query['hub.mode'] as string;
  const token = req.query['hub.verify_token'] as string;
  const challenge = req.query['hub.challenge'] as string;

  if (mode === 'subscribe' && token === env.WHATSAPP_VERIFY_TOKEN) {
    console.log('✅ Webhook verified successfully');
    res.status(200).send(challenge);
    return;
  }

  console.warn('❌ Webhook verification failed');
  res.sendStatus(403);
};

export const receiveWebhook = (req: Request, res: Response): void => {
  console.log('📩 Incoming WhatsApp Webhook');
  console.dir(req.body, { depth: null });

  res.status(200).send('EVENT_RECEIVED');
};