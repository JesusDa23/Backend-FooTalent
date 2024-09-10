import app from './app.js'
import { connectToDatabase } from './db.js'

connectToDatabase()
app.listen(3000)
console.log('Server running at http://localhost:3000/')
