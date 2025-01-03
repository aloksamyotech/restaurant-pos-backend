import express from 'express';
import corsConfig from './src/core/config/cors.js';
import connectDB from './src/core/database/connection.js';
import globalExceptionHandler from './src/utils/globalException.js';
import logger from './src/core/config/logger.js';
import "dotenv/config"
import responseInterceptor from './src/utils/responseInterceptor.js';

import { userRouter } from './src/routes/routes.js';
import { ingredientRouter } from './src/routes/routes.js';
import { categoryRouter } from './src/routes/routes.js';
import { itemRouter } from './src/routes/routes.js';
import {modifierRouter } from './src/routes/routes.js';
import {expenseTypeRouter } from './src/routes/routes.js';
import {expenseRouter } from './src/routes/routes.js';
import path from 'path';

const app = express();
const PORT = (() => {
    const env = process.env.ENV;
    return env === 'development' ? 7200 : 4545;
})();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



app.use(corsConfig);

app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

connectDB()
    .then(() => {
        logger.info('Database connected successfully');
    })
    .catch((err) => {
        logger.error(`Database connection failed: ${err.message}`); 
    });


// user Route

app.use(responseInterceptor);

app.use('/api/v1/user', userRouter)
app.use('/api/v1/ingredient', ingredientRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/item', itemRouter)
app.use('/api/v1/modifier', modifierRouter)
app.use('/api/v1/expenseType', expenseTypeRouter)
app.use('/api/v1/expense', expenseRouter)

app.use(globalExceptionHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at port ${PORT}`);
});
