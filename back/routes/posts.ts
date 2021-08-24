import express, { Request, Response } from 'express';
import db from '../models';
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;

const router = express.Router();

router.get('/', async (req:Request, res:Response, next) => {  // POST /post/comment
    try {
        const posts = await Post.findAll({  
            order: [['createdAt', 'DESC']],
            attributes: {               
                exclude: ['content']   
            }, 
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

export default router;