import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import router from "./router.js";
import authRouter from "./authRouter.js";


const PORT = 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use('/auth', authRouter)

async function startApp () {
    try {
        await mongoose.connect(
            'mongodb://mongo:27017/mydb',
        )
            .then(() => console.log('MongoDB Connected'))
            .catch(err => console.log(err));
        app.listen(PORT, () => console.log(`Listen ${PORT}`));

    }
    catch (e) {
        console.log(e)
    }
}

startApp();