import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// Routes
import productRoute from './routes/productRoute';
import cartRoute from './routes/cart';
import newsRoute from './routes/newsRoute';
import cors from 'cors';
import categoryRoute from './routes/categoryRoute';
import authRoute from './routes/auth';
import expressValidator from 'express-validator';
import userRoutes from './routes/user';

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: false,
    useCreateIndex: true
}).then(() => {
    console.log(`Database connected`)
});
mongoose.connection.on('Error', err => {
    console.log(`Data connected false, ${err.message} `);
})

// middleware
app.use(morgan('dev'));
app.use(express.json());

// app.use(express.urlencoded());
app.use(cors({
    origin: '*',
    credentials: true
}))
// app.use(expressValidator());

// routes middleware
app.use('/api', newsRoute);
app.use('/api', productRoute);
app.use('/api', categoryRoute);
app.use('/api', authRoute);
app.use('/api', userRoutes);
app.use('/api', cartRoute);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is runing in port: ${port}`);
})