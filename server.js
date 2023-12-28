const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const authRoutes = require('./routes/auth-routes');
const notificationRoutes = require('./routes/notification-routes');
const parkingRoutes = require('./routes/parking-routes');
const userRoutes = require('./routes/user-routes');


app.use('/auth', authRoutes);
app.use('/notification', notificationRoutes);
app.use('/parking-lot', parkingRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, function() {
    console.log(`Server running on port ${process.env.PORT}`);
});