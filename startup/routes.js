import express from 'express';
import errorMiddleware from '../middleware/error.js';
import grammerCheckingRouter from '../routes/grammar-checking.js';

export default function (app) {
    app.use(express.json());
    app.use(express.static('./uploads'));
    
    app.use(errorMiddleware)

    app.use('/api/grammar', grammerCheckingRouter);
}