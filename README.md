# FarmAI

FarmAI is an AI-powered platform designed to help farmers diagnose crop diseases by analyzing uploaded images of infected crops or user-inputted symptoms. It also provides expert suggestions, scientific cultivation systems, and serves as an online marketplace for agricultural products.

![FarmAI](https://img.shields.io/badge/version-1.0-brightgreen.svg)

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Demo Video](#demo-video)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## About the Project

FarmAI aims to empower farmers by providing timely diagnosis of crop diseases through AI, offering expert advice, and granting access to affordable farming products. The platform focuses on crop disease diagnosis, cultivation methods, and an online agricultural marketplace targeting the Bangladesh market and beyond.

## Key Features

- **AI-based Crop Disease Diagnosis**: Upload images of infected crops or describe symptoms to get AI-generated suggestions for diseases and treatments.
- **Expert Advice**: Get recommendations from agricultural experts for better crop management.
- **Scientific Cultivation**: Learn about modern and scientific methods for crop cultivation.
- **Marketplace**: A marketplace for buying farming products such as seeds, fertilizers, pesticides, and farm tools.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Farzine/FarmAI.git
   cd FarmAI
   cd client2
   cd server2
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables:
   Create a .env.local file in the root directory of client2 with the following keys:
   ```bash
   VITE_CLOUDINARY_CLOUD_NAME=
   VITE_CLOUDINARY_API_KEY=
   VITE_CLOUDINARY_API_SECRET=
   SECRET_KEY=
   MONGO_URI=
   VITE_APP_BACKEND_URL=http://localhost:5000
   VITE_APP_FRONTEND_URL=http://localhost:3000

   Create a .env file in the root directory of server2 with the following keys:
   ```bash
   SECRET_KEY= 
   MONGO_URI= 
   CLOUDINARY_CLOUD_NAME= 
   CLOUDINARY_API_KEY= 
   CLOUDINARY_API_SECRET= 
   CLOUDINARY_URL=
   NEXT_PUBLIC_APP_BACKEND_URL=http://localhost:5000
   NEXT_PUBLIC_APP_FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   PORT=5000
   OPENAI_API_KEY=
4. Run the development server:
   ```bash
   npm run dev

## Usage

- **Image Analysis**: Upload an image of your infected crop or describe the symptoms you're seeing. FarmAI will analyze the input and provide a diagnosis.
- **Browse the Marketplace**: Visit the marketplace to browse and purchase agricultural products like seeds, fertilizers, and more.
- **Expert Advice**: Read recommendations from experts on how to improve crop yield and management.

## Demo Video
You can find a demo video of the project [here].(https://github.com/Farzine/FarmAI/tree/main/client2/public/FarmAI.mp4)


## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and use a feature branch. Pull requests are warmly welcome.
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

Distributed under the MIT [License](license). See LICENSE for more information.

## Contact

Farzine - [alfezafarzine@gmail.com](alfezafarzine@gmail.com)

Project Link: [https://github.com/Farzine/FarmAI](https://github.com/Farzine/FarmAI)