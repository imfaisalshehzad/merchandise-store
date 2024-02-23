import express from 'express';
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import {validateToken} from "./utils/token";
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: `${process.env.FRONTEND_CORS_ORIGIN}` || `http://localhost:3000`,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use("/", authRoutes);
app.use('/api', validateToken, productRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});