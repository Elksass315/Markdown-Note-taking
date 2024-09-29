import express from 'express';
import config  from 'config';
import startConfig from './startup/config.js';
import startDB from './startup/DB.js';
import startLogging from './startup/logging.js';
import startRoutes from './startup/routes.js';
import swagger from './startup/swagger.js';

const app = express();

startConfig();
startDB();
startLogging();
startRoutes(app);
swagger(app);

app.get('/', (req, res) => {
    res.send('Welcom to MARKDOWN-NOTE-TAKING-APP');
});
    
const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
    console.log(`Srever is running on http://localhost:${PORT}`);
});
