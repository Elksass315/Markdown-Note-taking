import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';


import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function (app) {
    const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../helpers/swagger.json'), 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}