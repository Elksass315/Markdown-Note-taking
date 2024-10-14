import express from 'express';
import errorMiddleware from '../middleware/error.js';
import grammerCheckingRouter from '../routes/grammar-checking.js';
import authRouter from '../routes/auth.js';
import userRouter from '../routes/users.js'; 
import markdownRouter from '../routes/markdown.js';
import fileRenderingRouter from '../routes/fileRendring.js';
import toDoRouter from '../routes/toDo.js';

export default function (app) {
    app.use(express.json());
    app.use(express.static('./uploads'));
    
    app.use(errorMiddleware)

    app.use('/api/file-rendering', fileRenderingRouter);
    app.use('/api/grammar', grammerCheckingRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/markdown', markdownRouter);
    app.use('/api/todo', toDoRouter);
}