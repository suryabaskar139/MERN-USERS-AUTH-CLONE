const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./config/connectDb');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const { error } = require('console');
const userRouter = require('./routes/userRoute');
const cookieParser = require('cookie-parser');

dotenv.config({path : path.join(__dirname,'config','config.env')})
connectDb();
const app = express();

app.use(express.json())
app.use(cookieParser())


app.get('/',(req,res) => {
    res.json("Welcome Home!")
});

app.use('/api/users',userRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,() => {
    console.log(`Server Connected to localhost`);
});
