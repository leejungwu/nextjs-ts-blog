import express, { Request, Response } from 'express';
import db from '../models';
const { isLoggedIn } = require('./middlewares');
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;

const router = express.Router();

type RequestWithUser = Request & {user: any};
function assertHasUser(req: Request): asserts req is RequestWithUser {
    if (!( "user" in req)) {
        throw new Error("Request object without user found unexpectedly");
    }
}

router.post('/', isLoggedIn, async (req:Request, res:Response, next) => {  // POST /post
    try {
        assertHasUser(req);
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User,  // 게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User,  // 좋아요 누른사람
                as: 'Likers',
                attributes: ['id'],
            }]
        })
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:postId', async (req:Request, res:Response, next) => {  // GET /post/1
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        });
        if (!post) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User,  // 게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User,  // 좋아요 누른사람
                as: 'Likers',
                attributes: ['id'],
            }]
        })
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.post('/:postId/comment', isLoggedIn, async (req:Request, res:Response, next) => {  // POST /post/1/comment
    try {
        assertHasUser(req);
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            responseToId: req.body.responseToId || null,
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            attributes: ['content','PostId','responseToId'], 
            include: [{
                model: User,    // 댓글 작성자 
                attributes: ['id', 'nickname'],
            }, {
                model: Comment,    // 부모 댓글
                as: 'responseTo',
                attributes: ['content','responseToId'],
                include: [{
                    model: User,
                    attributes: ['id']
                }]
            }],
        })
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch('/:postId/like', async (req, res, next) => {
    try {
        assertHasUser(req);
        const post= await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id); // db조작할때는 await
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/:postId/like', async (req, res, next) => {
    try {
        assertHasUser(req);
        const post= await Post.findOne({ where: { id: req.params.postId }});
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id); 
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.patch('/:postId', isLoggedIn, async (req:Request, res:Response, next) => {  // PATCH /post/1
    try {
        assertHasUser(req);
        await Post.update({
            title: req.body.title,
            content: req.body.content
        },{
            where: { 
                id: req.params.postId, 
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId,10), title: req.body.title, content: req.body.content });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/:postId', isLoggedIn, async (req:Request, res:Response, next) => {  // DELETE /post/1
    try {
        assertHasUser(req);
        await Post.destroy({
            where: { 
                id: req.params.postId, 
                UserId: req.user.id,
            },
        });
        res.status(200).json({ PostId: parseInt(req.params.postId,10) })
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/:postId/comment/:commentId', isLoggedIn, async (req, res, next) => { // DELETE /post/1/comment/2
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.findOne({ where: { id:req.params.commentId }});
        if(!comment){
            res.status(403).json('존재하지 않는 댓글입니다.')
        }
        await Comment.destroy({ where: { id: req.params.commentId } });
        res.status(200).json({ PostId: parseInt(req.params.postId, 10), CommentId: parseInt(req.params.commentId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

export default router;