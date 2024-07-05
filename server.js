import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './DataBase.js';
import authRoutes from './routes/auth.routes.js'
import todoRoutes from './routes/todo.routes.js'
import cors from 'cors'

dotenv.config();


const app = express();
app.use(express.json());  // to parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes);


const port = process.env.PORT


app.get('/', (req, res) => {
    res.status(200).json("hello")
})


app.listen(port, () => {
    console.log('Listening on port:', port)
    ConnectDb();
})


