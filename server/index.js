import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";

import postRoute from "./routes/postRoute.js";
import dalleRoute from "./routes/dalleRoute.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', postRoute);
app.use('/api/v1/dalle', dalleRoute);

app.get('/', async (req, res) => {
    res.send("Hello Dalle");
})



const startServer = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL.replace("<password>", process.env.MONGODB_PASSWORD);
        connectDB(MONGODB_URL);
    }
    catch (error) {
        console.log(error);
    }

    const PORT = process.env.PORT;

    app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`));
}

startServer();