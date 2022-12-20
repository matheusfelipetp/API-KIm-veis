import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { userRoutes } from './routers/users.routes';
import { sessionsRoutes } from './routers/sessions.routes';
import { errorHandler } from './errors/AppError';
import { categoryRoutes } from './routers/categories.routes';
import { propertyRoutes } from './routers/properties.routes';
import { schedulesRoutes } from './routers/schedules.routes';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/login', sessionsRoutes);
app.use('/categories', categoryRoutes);
app.use('/properties', propertyRoutes);
app.use('/schedules', schedulesRoutes);
app.use(errorHandler);

export default app;
