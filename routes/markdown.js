import express from "express";
import multer from "multer";
import multerStorage from "../helpers/multerStorage.js";
import auth from "../middleware/auth.js";
import userFiles from "../model/userFile.js";
import winston from "winston";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const upload = multer({ storage: multerStorage, limits: { fileSize: 1000000 } });

router.post("/upload", [auth, upload.single("file")], async (req, res) => {

    if (req.file) {
        if (req.file.originalname.match(/\.(md|markdown)$/i) === null) {
            res.status(400).json({ error: "File must be a markdown file" });
            return;
        }

        let userFile = await userFiles.findOne({ User: req.user._id });
        if (userFile) {
            if (!userFile.files) {
                userFile.files = [];
            }
            userFile.files.push(req.file.path);
            await userFile.save();
        } else {
            const newUserFile = new userFiles({
                User: req.user._id,
                files: [req.file.path]
            });

            await newUserFile.validate();
            await newUserFile.save();
        }

        res.json({ file: req.file });
    } else {
        res.status(400).json({ error: "No file uploaded" });
    }
});


router.get("/files-list", auth, async (req, res) => {
    let userFile = await userFiles.findOne({ User: req.user._id });
    if (userFile) {
        res.json({ files: userFile.files });
    } else {
        res.status(404).json({ error: "No files found" });
    }
});

router.get("/file/:fileid", auth, async (req, res) => {
    let userFile = await userFiles.findOne({ User: req.user._id });
    if (userFile) {

        const requestedFile = `uploads\\${req.params.fileid}`;

        if (userFile.files.includes(requestedFile)) {
            const filePath = path.join(__dirname, '..', 'uploads', req.params.fileid);
            res.sendFile(filePath, (err) => {
                if (err) {
                    winston.error(err);
                    res.status(500).json({ error: "Could not send the file" });
                }
            });
        } else {
            res.status(404).json({ error: "File not found" });
        }
    } else {
        res.status(404).json({ error: "No files found" });
    }
});

router.delete("/file/:fileid", auth, async (req, res) => {
    let userFile = await userFiles.findOne({ User: req.user._id });
    if (userFile) {
        const requestedFile = `uploads\\${req.params.fileid}`;
        if (userFile.files.includes(requestedFile)) {
            userFile.files = userFile.files.filter(file => file !== requestedFile);
            await userFile.save();
            res.json({ message: "File deleted" });
        } else {
            res.status(404).json({ error: "File not found" });
        }
    } else {
        res.status(404).json({ error: "No files found" });
    }
});


export default router;