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
app.use(cors());

// CORS configuration

const allowedOrigins = [
    'http://localhost:5173',
    "https://project3-back.vercel.app"
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Allow cookies and credentials to be sent
  };
  
  app.use(cors(corsOptions));
  
  // Handle preflight requests for all routes
  app.options('*', cors(corsOptions));

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