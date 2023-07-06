import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/connection.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();
connectDB();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

app.use('/api', contactRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
    }
);