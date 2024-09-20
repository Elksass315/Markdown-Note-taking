import mongoose from "mongoose";
import config from "config";
import winston from "winston";

export default function () {
    mongoose.connect(
        config.get("db"))
        .then(() => {
            winston.info(`DB Connected to ${config.get("db")}`);
            console.log(`DB Connected to ${config.get("db")}`);
        });
}