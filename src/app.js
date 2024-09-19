import express from 'express'
import cors from 'cors'
import IndexRoutes from './routes/index.routes.js'
import morgan from 'morgan'
import './models/index.model.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1/', IndexRoutes)

export default app
