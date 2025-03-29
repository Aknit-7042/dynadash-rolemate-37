
// This file provides environment variables for the browser environment
// It replaces the Node.js process.env object that Next.js would normally provide

export const env = {
  // Add any environment variables your app needs here
  NODE_ENV: import.meta.env.MODE || 'development',
  BASE_PATH: import.meta.env.BASE_URL || '/',
};
