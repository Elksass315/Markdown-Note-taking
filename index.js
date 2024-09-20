import express from 'express';
import config  from 'config';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcom to MARKDOWN-NOTE-TAKING-APP');
});
    
const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
    console.log(`Srever is running on localhost:${PORT}`);
});
