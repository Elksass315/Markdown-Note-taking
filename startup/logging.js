import winston from "winston";
import "express-async-errors";
import config from "config";

export default function () {
    winston.exceptions.handle(
        new winston.transports.File({ filename: config.get("logFile") }),
        new winston.transports.Console());
}