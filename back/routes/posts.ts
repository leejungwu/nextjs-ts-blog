import express, { Request, Response } from 'express';
import db from '../models';
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;

const router = express.Router();

router.get('/', async (req:Request, res:Response, next) => {  // GET /posts
    try {
        const posts = await Post.findAll({  
            order: [['createdAt', 'DESC']],
            attributes: {               
                exclude: ['content']   
            },
            include: [{
                model: Comment,
                include: [{
                  model: User,
                  attributes: ['id', 'nickname'],
                }],
              },{
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }] 
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

export default router;