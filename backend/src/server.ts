require('dotenv').config()
import express, { Express, NextFunction, Request, Response } from 'express';
import * as user from '../controller/user-controller'
import * as db from '../database/typeorm.config'
import * as post from '../controller/post-controller'
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
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(
    session({
      secret: 'your_secret_key_here',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'strict'
      }
    })
);

// Auth middleware
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.authenticated){
    next()
  }else{
    res.status(404).json({error: "not authorized"})
  }

}

// Api endpoints
app.post('/api/register', user.register)
app.post('/api/login', user.login)
app.post('/api/logout', user.logout)

app.post('/api/createPost', isAuth, post.createPost)
app.get('/api/getPost/:postId', isAuth, post.getPost)
app.put('/api/updatePost/:postId', isAuth, post.updatePost)
app.delete('/api/deletePost/:postId', isAuth, post.deletePost)
app.get('/api/allPost', isAuth, post.allPost)

app.get('/api/woo', isAuth, (req: Request, res: Response) => {
    res.send("hohohohoho")
})

// Hosting
app.listen(process.env.HOST, ()=>{
    console.log(`Hosting on PORT ${process.env.HOST}`)
})