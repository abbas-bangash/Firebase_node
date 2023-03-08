const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

//connect DB
connectDB();

//route files
const auth = require('./routes/auth');
const post = require('./routes/post');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//controller files
app.use('/v1/auth', auth);
app.use('/v1/posts', post);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close server & exit process
    server.close(() => process.exit(1));
});