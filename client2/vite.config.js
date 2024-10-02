import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  define: {
    'process.env': {
        VITE_CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.VITE_CLOUDINARY_CLOUD_NAME),
        VITE_CLOUDINARY_API_KEY: JSON.stringify(process.env.VITE_CLOUDINARY_API_KEY),
        VITE_CLOUDINARY_API_SECRET: JSON.stringify(process.env.VITE_CLOUDINARY_API_SECRET),
        VITE_IMG_UPLOAD_PRESET: JSON.stringify(process.env.VITE_IMG_UPLOAD_PRESET),
        VITE_APP_BACKEND_URL: JSON.stringify(process.env.VITE_APP_BACKEND_URL),
        VITE_APP_FRONTEND_URL: JSON.stringify(process.env.VITE_APP_FRONTEND_URL),
        MONGO_URI: JSON.stringify(process.env.MONGO_URI),
        GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
        SMTP_HOST: JSON.stringify(process.env.SMTP_HOST),
        SMTP_PORT: JSON.stringify(process.env.SMTP_PORT),
        SMTP_USER: JSON.stringify(process.env.SMTP_USER),
        SMTP_PASSWORD: JSON.stringify(process.env.SMTP_PASSWORD),
        EMAIL_FROM: JSON.stringify(process.env.EMAIL_FROM),
        SMTP_SECURE: JSON.stringify(process.env.SMTP_SECURE),
        // Add any other environment variables you need here
    },
},
});


