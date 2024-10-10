import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import IndexRoutes from './routes/index.routes.js'
import './models/index.model.js'

const app = express()

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1/', IndexRoutes)


export default app