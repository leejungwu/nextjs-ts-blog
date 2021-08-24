import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

const ReplyComment = (props:any) => {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment:any) => {
            if(comment.responseToId === props.parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber)
    },[props.commentLists])

    const PostId = props.PostId;

    const onHandleChange = () => {
        setOpenReplyComments((prev) => !prev);
    } 

    return (
        <div>
            {ChildCommentNumber > 1 ? (
                <a style={{ fontSize: '14px', marginLeft: '20px', color: 'gray' }} onClick={onHandleChange}>
                    댓글 {ChildCommentNumber}개 보기
                </a>
            ): (ChildCommentNumber == 1 ? (
                <a style={{ fontSize: '14px', marginLeft: '20px', color: 'gray' }} onClick={onHandleChange}>
                    댓글 보기
                </a>
            ):null)}

            {OpenReplyComments && (
                props.commentLists.map((comment:any) => (
                    <>
                        {comment.responseToId === props.parentCommentId && (
                            <div style={{ width: '80%', marginLeft: '40px'}}>
                                {props.depth === 1 ? (
                                    <>
                                        <SingleComment comment={comment} PostId={PostId} commentId={comment.id} responseToId={comment.id} commentLists={props.commentLists} depth={2}/> 
                                        <ReplyComment parentCommentId={comment.id} commentLists={props.commentLists} PostId={PostId} depth={2}/>
                                    </>
                                ):props.depth === 2 ?(
                                    <SingleComment comment={comment} PostId={PostId} commentId={comment.id} responseToId={comment.id} commentLists={props.commentLists} depth={3}/>
                                ):null}
                            </div>
                        )}
                    </>
                ))
            )}
        </div>
    )
}

export default ReplyComment