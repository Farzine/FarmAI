require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const scientificCultivationMethodsRoutes = require('./routes/scientificCultivationMethodsRoutes');
// const sponsorRoutes = require('./routes/sponsorRoutes');
// const importantDateRoutes = require('./routes/importantDateRoutes');
// const noticeRoutes = require('./routes/noticeRoutes');
// const messageRoutes = require('./routes/messagesRoutes');
// const researchTrackRoutes = require('./routes/researchTrackRoutes');
// const industryTrackRoutes = require('./routes/industryTrackRoutes');
// const importantUpdateRoutes = require('./routes/importantUpdateRoutes');
// const ScheduleRoutes = require('./routes/ScheduleRoute');
// const sessionListRoutes = require('./routes/sessionListRoutes');
const frontUrl = process.env.NEXT_PUBLIC_APP_FRONTEND_URL;

const { MONGO_URI } = require('./config/config');
const { initializeAdmin } = require('./models/admin');
// const regRouter = require('./routes/registration');

const corsOptions ={
  origin:`${frontUrl}`, 
  methods:['GET','POST','PUT','DELETE'],
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

app.use('/admin', adminRoutes);
app.use('/scientificCultivationMethods', scientificCultivationMethodsRoutes);
// app.use('/important-dates', importantDateRoutes);
// app.use('/notices', noticeRoutes);
// app.use('/messages', messageRoutes);
// app.use('/research-tracks', researchTrackRoutes);
// app.use('/industry-tracks', industryTrackRoutes);
// app.use('/registration',regRouter);
// app.use('/important-updates', importantUpdateRoutes);
// app.use('/schedule',ScheduleRoutes);
// app.use('/sessionList',sessionListRoutes);
// app.use('/sponsors', sponsorRoutes);

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
