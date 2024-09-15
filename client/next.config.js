// next.config.js
module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com','www.google.com', 'img.freepik.com'],
    },
  };
  
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
  
module.exports = nextConfig;