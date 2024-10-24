import app from './app.js'
import { connectToDatabase } from './db.js'
import executeRegister from './utils/executeRegister.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

await connectToDatabase()

app.listen(process.env.AppPort, (res, error) => {
    console.log('Server running at http://localhost:' + process.env.AppPort)

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);


    const uploadDir = path.join(__dirname, 'uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // executeRegister()
})
