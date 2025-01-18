require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./utils/database');

const authRoute = require('./routes/authRoute');
//const adminRoute = require('./routes/adminRoutes');
//const userRoute = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    // Database Connection
    await connectDatabase();

    // Routes
   //app.use('/api/user', userRoute);
   //app.use('/api/admin', adminRoute);
   app.use('/api/auth', authRoute);


    // Error handling middleware
    app.use(errorHandler);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
})();
