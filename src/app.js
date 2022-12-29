import express from 'express';
import mapRoutes from './routes/map.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import morgan from "morgan";
import cors from 'cors';

//Express configuration
const app = express();

//Settings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/api/map',mapRoutes);
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

export default app;
