import axios from 'axios';
import { env } from '../config/env.js';

const whatsappClient = axios.create({
  baseURL: `https://graph.facebook.com/${env.WHATSAPP_API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
  },
});

export const sendTextMessage = async (to: string, body: string): Promise<unknown> => {
  try {
    const response = await whatsappClient.post(`/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        preview_url: false,
        body,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to send WhatsApp text message:', error.response?.data || error.message);
    } else {
      console.error('Failed to send WhatsApp text message:', error);
    }
    throw error;
  }
};