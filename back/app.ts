import express, { Application } from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';

import postsRouter from './routes/posts';
import postRouter from './routes/post';
import userRouter from './routes/user';
import authRouter from './routes/auth';

import db from './models';
const passportConfig = require('./passport');

dotenv.config();
const app: Application = express();

db.sequelize.sync()
    .then(() => {
        console.log('db Connected!!');
    })
    .catch(console.error);
passportConfig();

app.set('trust proxy', 1);
if (process.env.NODE_ENV === 'production') {  // 개발
    app.use(morgan('combined'));  // reqs from front to back
    app.use(hpp());
    app.use(helmet());
    app.use(cors({
        origin: [
            'https://www.jdoublew.me', 
            'http://www.jdoublew.me', 
            'http://jdoublew.me', 
            'https://jdoublew.me',
            'http://localhost:3000'
        ],
        credentials: true,
    }));
} else {
    app.use(morgan('dev'));  // reqs from front to back
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET as string));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET as string,
    proxy: true,
    cookie: {
        httpOnly: true,
        secure: false,  // 배포할때는 true, http에서는 false
        domain: process.env.NODE_ENV === 'production' ? '.jdoubleu.me' : undefined
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(80, () => {
    console.log('Server running!!')
});