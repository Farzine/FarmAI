require('dotenv').config();
require('./controllers/userController'); 
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const adminRoutes = require('./routes/adminRoutes');
// const scientificCultivationMethodsRoutes = require('./routes/scientificCultivationMethodsRoutes');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
// const importantDateRoutes = require('./routes/importantDateRoutes');
// const noticeRoutes = require('./routes/noticeRoutes');
// const messageRoutes = require('./routes/messagesRoutes');
// const researchTrackRoutes = require('./routes/researchTrackRoutes');
// const industryTrackRoutes = require('./routes/industryTrackRoutes');
// const importantUpdateRoutes = require('./routes/importantUpdateRoutes');
// const ScheduleRoutes = require('./routes/ScheduleRoute');
// const sessionListRoutes = require('./routes/sessionListRoutes');
const frontUrl = process.env.NEXT_PUBLIC_APP_FRONTEND_URL;


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
////////////////////////////////////////////////////////////////////


const { MONGO_URI } = require('./config/config');
const { initializeAdmin } = require('./models/admin');
// const regRouter = require('./routes/registration');

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

const app = express();
const PORT = 5000;

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


// app.use('/admin', adminRoutes);
// app.use('/scientificCultivationMethods', scientificCultivationMethodsRoutes);
// app.use('/important-dates', importantDateRoutes);
// app.use('/notices', noticeRoutes);
// app.use('/messages', messageRoutes);
// app.use('/research-tracks', researchTrackRoutes);
// app.use('/industry-tracks', industryTrackRoutes);
// app.use('/registration',regRouter);
// app.use('/important-updates', importantUpdateRoutes);
// app.use('/schedule',ScheduleRoutes);
// app.use('/user',userRoutes);
// app.use('/product', productRoutes);

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
/////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('Welcome Farm AI');
});

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await initializeAdmin(); 
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
