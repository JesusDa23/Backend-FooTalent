import express from 'express'
import cors from 'cors'

import AuthRoutes from './routes/auth.routes.js'
import morgan from 'morgan'
import './models/index.model.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/v1/auth', AuthRoutes)

export default app
