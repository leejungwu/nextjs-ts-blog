import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import db from '../models';
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = db.User;
const Post = db.Post;

const router = express.Router();

type RequestWithUser = Request & {user: any};
function assertHasUser(req: Request): asserts req is RequestWithUser {
    if (!( "user" in req)) {
        throw new Error("Request object without user found unexpectedly");
    }
}

router.get('/', async (req:any, res:Response, next) => {
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {               
                    exclude: ['password']   //['id','nickname','email']
                }, 
                include: [{
                    model: Post,
                    attributes: ['id'],
                }]
            })
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (info) {
            return res.status(403).send(info.message);
        }
        return req.login(user, async (loginErr) => { // passport login
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {               
                    exclude: ['password']   //['id','nickname','email']
                }, 
                include: [{
                    model: Post,
                    attributes: ['id'],
                }]
            })

            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req:Request, res:Response, next) =>{
    req.logout();
    req.session.destroy((err) => console.error(err));
    res.send('ok');
})


router.post('/', isNotLoggedIn, async (req:Request, res:Response, next:NextFunction) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if (exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({     
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(200).send('ok');
    } catch (error){
        console.error(error);
        next(error);
    }
});


router.patch('/nickname', isLoggedIn, async (req:any, res, next) => {
    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/', isLoggedIn, async (req:Request, res:Response) => {
    try {
        assertHasUser(req);
        await User.destory({
            where: {
                UserId: req.user.id,
            }
        })
    } catch (error) {
        console.error
    }
})

export default router;