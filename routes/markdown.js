import express from "express";
import multer from "multer";
import multerStorage from "../helpers/multerStorage.js";
import auth from "../middleware/auth.js";
import userFiles from "../model/userFile.js";

const router = express.Router();
const upload = multer({ storage: multerStorage, limits: { fileSize: 1000000 } });

router.post("/upload", [auth, upload.single("file")], async(req, res) => {


    if (req.file) {
        if (req.file.originalname.match(/\.(md|markdown)$/i) === null) {
            res.status(400).json({ error: "File must be a markdown file" });
            return;
        }

        let userFile = await userFiles.findOne({ User: req.user._id });

        // If the user has files already, push the new file
        if (userFile) {
            if (!userFile.files) {
                // Ensure the 'files' array exists
                userFile.files = [];
            }
            userFile.files.push(req.file.path);
            await userFile.save();
        } else {
            // If the user doesn't have files, create a new entry
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

export default router;