import express from 'express';
import multer from 'multer';
import { readFile, unlink } from 'fs';
import { promisify } from 'util';
import { marked } from 'marked';
import winston from 'winston';
import auth from "../middleware/auth.js"
import userFiles from "../model/userFile.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();
const upload = multer({ dest: '../tmp' });

const readFileAsync = promisify(readFile);
const unlinkAsync = promisify(unlink);

router.post('/md', upload.single('markdown'), async (req, res) => {
    const { file } = req;
    const mdFilePath = file.path;

    try {
        
        const data = await readFileAsync(mdFilePath, 'utf8');

        const htmlContent = marked(data);

        res.send(`
            <html>
            <head>
                <title>Markdown Rendered to HTML</title>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `);

        await unlinkAsync(mdFilePath);
    } catch (error) {
        winston.error(error)
        res.status(500).send('An error occurred while processing the file.');
    }
});


router.get("/:fileid", auth, async (req, res) => {
    try {
        
        let userFile = await userFiles.findOne({ User: req.auth._id });

        if (!userFile) {
            return res.status(404).json({ error: "No files found" });
        }


        const requestedFile = `uploads\\${req.params.fileid}`;
        if (!userFile.files.includes(requestedFile)) {
            return res.status(404).json({ error: "File not found" });
        }


        const filePath = path.join(__dirname, '..', 'uploads', req.params.fileid);

        readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                winston.error(err);
                return res.status(500).json({ error: "Could not read the file" });
            }

            
            const htmlContent = marked(data);

            res.send(`
                <html>
                <head>
                    <title>Rendered Markdown</title>
                </head>
                <body>
                    ${htmlContent}
                </body>
                </html>
            `);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});


export default router;