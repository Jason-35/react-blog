require('dotenv').config()
import express, { Express, Request, Response } from 'express';
import * as user from '../controller/user-controller'
import * as db from '../database/typeorm.config'
import cors from 'cors';
import session from 'express-session';

// import session from 'express-session';
const app: Express = express();

declare module 'express-session' {
    interface SessionData {
      username: string;
      authenticated: boolean;
    }
  }

db.connectDB(process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, process.env.MYSQL_DATABASE)

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(
    session({
      secret: 'your_secret_key_here',
      resave: false,
      saveUninitialized: false,
    })
  );


// Api endpoints
app.post('/api/register', user.register)
app.post('/api/login', user.login)

app.get('/api/woo', (req: Request, res: Response) => {
    res.send("hohohohoho")
})

// Hosting
app.listen(process.env.HOST, ()=>{
    console.log(`Hosting on PORT ${process.env.HOST}`)
})