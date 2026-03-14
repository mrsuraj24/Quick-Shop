import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
// import chatbot from './routes/chatRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: 'backend/config/config.env' })
}

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(fileUpload())

//Route
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)
// app.use("/api/v1", chatbot)

// Server static files
app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
})

app.use(errorHandleMiddleware);

export default app;