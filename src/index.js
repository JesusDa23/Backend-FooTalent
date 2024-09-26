import app from './app.js'
import { connectToDatabase } from './db.js'
import { swaggerDocs } from './docs.js'
import executeRegister from './utils/executeRegister.js'

await connectToDatabase()

app.listen(process.env.AppPort, (res, error) => {
    console.log('Server running at http://localhost:' + process.env.AppPort)
    swaggerDocs(app)
    // executeRegister()
})
