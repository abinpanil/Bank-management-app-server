import  express  from "express";
import dotenv from 'dotenv';
import routes from './routes/index.js'
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import multer from 'multer';
import cors from 'cors';
const upload = multer();
import connectDb from './config/db.js';

dotenv.config();
connectDb();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    origin:'*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


// routes
app.use(routes);

// error Middlewares
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, console.log(`server is running on port ${PORT}`));