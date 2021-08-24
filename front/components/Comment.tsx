import React, { useCallback, useEffect } from 'react'
import { Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

import { RootState } from '../interface/rootstate'
import { addComment, LOAD_POST_REQUEST } from '../reducers/post'


const Comment = (props:any) => {
    const dispatch = useDispatch();
    const PostId = props.PostId;
    const id = useSelector((state:RootState) => state.user.me?.id) // 로그인했을 때 유저아이디
    const { addCommentDone } = useSelector((state:RootState) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
          setCommentText('')
          dispatch({
            type: LOAD_POST_REQUEST,
            data: PostId,
        });
        }
      }, [addCommentDone])

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        dispatch(addComment({ content: commentText, postId: PostId, userId: id }));
        console.log(PostId, commentText); // postid, 댓글, id 전달
    }, [commentText]);

    return (
        <>
            <div>
                {/* Root Comment Form */}
                <form style={{ display: 'flex' }} onSubmit={onSubmitComment}>
                    <Input
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onChangeCommentText}
                        value={commentText}
                        placeholder="로그인 후 댓글을 작성해주세요. 답글이 달리면 삭제 할 수 없습니다."
                    />
                    <br/>
                    <Button style={{ width: '20%', height: '52px' }} htmlType="submit">등록</Button>
                </form>

                {/* Comment Lists  */}
                {props.commentLists && props.commentLists.map((comment:any) => (
                    (!comment.responseToId &&
                        <div>
                            <SingleComment 
                                comment={comment} 
                                PostId={PostId} 
                                commentId={comment.id} 
                                responseToId={comment.id} 
                                commentLists={props.commentLists}
                                depth={1}
                            />
                            <ReplyComment parentCommentId={comment.id} commentLists={props.commentLists} PostId={PostId} depth={1}/>
                        </div>
                    )
                ))}
            </div>
        </>
    )
}

export default Comment