import app from './app.js';
import { env } from './config/env.js';

app.listen(env.PORT, () => {
  console.log('=================================');
  console.log(`🚀 Server running on port ${env.PORT}`);
  console.log(`🌐 Health Check: http://localhost:${env.PORT}/health`);
  console.log(`📦 Environment: ${env.NODE_ENV}`);
  console.log('=================================');
});