import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config.js';
import router from './src/routes/bot.routes.js';


dotenv.config();

const app = express();

const corsOptions = { origin: "*" };
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/zumator-bot/v1', router);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Zumbator Bot." });
});

app.use((req, res) => {
    return res.status(400).send({ message: "Sorry! Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
