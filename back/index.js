import dotenv from 'dotenv'
import connectDatabase from './database.js'
import express from 'express'
import cors from 'cors'


//Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();
dotenv.config()
connectDatabase()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
    'http://localhost:5173',
    'https://project3-front-chi.vercel.app'
  ];
// CORS configuration
const corsOptions = {
    origin: allowedOrigins, // Replace with your frontend's origin
    methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};

app.use(cors(corsOptions));

  
  // Handle preflight requests for all routes


// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Api PR3...')
})

const port = 3001
app.listen(port, () => {
    console.log(`server on http://localhost:${port}/`);
    console.log(process.env.TOKEN_SECRET)

})