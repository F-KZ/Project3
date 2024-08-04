import dotenv from 'dotenv'
dotenv.config()
import connectDatabase from './database.js'
import express from 'express'
import cors from 'cors'


//Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

connectDatabase()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://project3-back.vercel.app'
  ];
  app.use(cors(allowedOrigins));

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