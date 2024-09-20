import express from 'express';
import errorMiddleware from '../middleware/error.js';


export default function (app) {
    app.use(express.json());
    app.use(express.static('./uploads'));
    
    app.use(errorMiddleware)
}