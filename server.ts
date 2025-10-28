import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;
console.log(port);

app.use(express.json());

app.listen(port, () => {
    console.log(`DB-Test listening on port ${port}`);
});
