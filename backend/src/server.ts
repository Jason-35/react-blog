require('dotenv').config()
import express, { Express, Request, Response } from 'express';
import * as user from '../controller/user-controller'
import * as db from '../database/typeorm.config'
import cors from 'cors';

const app: Express = express();

db.connectDB(process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, process.env.MYSQL_DATABASE)

// Middleware
app.use(cors())
app.use(express.json());


// Api endpoints
app.get('/api/register', user.register)

app.get('/api/woo', (req: Request, res: Response) => {
    res.send("hohohohoho")
})

// Hosting
app.listen(process.env.HOST, ()=>{
    console.log(`Hosting on PORT ${process.env.HOST}`)
})