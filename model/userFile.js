import mongoose from "mongoose";
import User from "./users.js";

const userFileSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    files: {
        type: [String],
        required: true,
    }
});

const userFiles = mongoose.model("File", userFileSchema);

export default userFiles;
