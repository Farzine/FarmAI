require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const frontUrl = process.env.NEXT_PUBLIC_APP_FRONTEND_URL;



const app = express();
const PORT = 5000;
app.set('trust proxy', 1);

////////////////////////////////////////////////////////////////////
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");


const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const commonSCMRouter = require("./routes/common/scientificCultivationMethods-routes");
const commonEARouter = require("./routes/common/expertAdvice-routes");

const imageAnalyzerRoutes = require('./routes/imageAnalyzerRoutes');
////////////////////////////////////////////////////////////////////


const { MONGO_URI } = require('./config/config');

const corsOptions ={
  origin:`${frontUrl}`, 
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials:true,            
  optionSuccessStatus:200,
}



app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

// Set up express-session middleware (required for persistent login sessions)
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());



/////////////////////////////////////////////////////////////////////////
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);


app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/common/scm", commonSCMRouter);
app.use("/api/common/expertAdvice", commonEARouter);

app.use('/api/images', imageAnalyzerRoutes);
/////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('Welcome Farm AI');
});

mongoose.connect(MONGO_URI) 
  .then(async () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
