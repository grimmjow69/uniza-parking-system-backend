const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/auth', authRoutes);
app.use('/notification', notificationRoutes);
app.use('/parking-lot', parkingRoutes);
app.use('/user', userRoutes);

app.listen(8080, function() {
    console.log('Server running on port 8080');
});