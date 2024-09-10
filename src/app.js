import express from 'express'
import cors from 'cors'

import AuthRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', AuthRoutes)

export default app
