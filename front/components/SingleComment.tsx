import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { List, Comment, Avatar, Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import useInput from '../hooks/useInput';

import { addComment, LOAD_POST_REQUEST, REMOVE_COMMENT_REQUEST } from '../reducers/post';
import { RootState } from '../interface/rootstate';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'
var relativeTime = require('dayjs/plugin/relativeTime')

import styled from 'styled-components';


dayjs.locale('ko');
dayjs.extend(relativeTime);

const TimeStamp = styled.span`
  float: right;
  margin-left: 20px;
`;

const SingleComment = (props:any) => {
    const dispatch = useDispatch();

    const id = useSelector((state:RootState) => state.user.me?.id) // 로그인했을 때 유저아이디
    const { addCommentDone, removeCommentDone } = useSelector((state:RootState) => state.post);
    const [ChildResponseToNumber, setChildResponseToNumber] = useState(0);
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, OnChangeCommentValue, setCommentValue] = useInput('');

    useEffect(() => {
        let ResponseToNumber = 0;
        props.commentLists.map((comment:any) => {
            if(comment.responseToId === props.commentId) {
                ResponseToNumber++;
            }
        })
        setChildResponseToNumber(ResponseToNumber)
    },[props.commentLists])

    const onClickReplyOpen = () => {
        setOpenReply((prev) => !prev);
    }

    useEffect(() => {
        if (addCommentDone || removeCommentDone) {
            setCommentValue('')
            dispatch({
                type: LOAD_POST_REQUEST,
                data: props.PostId,
            });
        }
      }, [addCommentDone,removeCommentDone])

    const onSubmitReply = useCallback((e) => {
        e.preventDefault();
        dispatch(addComment({ content: CommentValue, postId: props.PostId, userId: id, responseToId: props.responseToId }));
        setOpenReply(false);
    },[CommentValue]); // postid, 댓글, id, responseTo 전달

    const onRemoveComment = useCallback((id) => () => {
        return dispatch({
          type: REMOVE_COMMENT_REQUEST,
          data: { postId: props.PostId, commentId: id},
        })
    }, [id]);

    return (
        <List itemLayout="horizontal">
            <div>
                {(props.depth === 1 || props.depth === 2)
                    ?
                    <Comment
                    actions={[
                        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
                    ]}
                    author={props.comment.User && props.comment.User.nickname}
                    avatar={<Avatar>{props.comment.User && props.comment.User.nickname[0]}</Avatar>}
                    content={(
                        <p style={{ display: 'inline'}}>
                            {props.comment.content}
                            {props.comment.User.id === id && ChildResponseToNumber == 0
                                ? (<Button 
                                    type='text'
                                    shape='circle'
                                    onClick={onRemoveComment(props.comment.id)}
                                    ><DeleteOutlined style={{ paddingBottom: '5px'}}/></Button>)
                                : null}
                            <TimeStamp>{dayjs(props.comment.createdAt).locale('ko').fromNow()}</TimeStamp>
                        </p>
                    )}
                    />
                    :
                    <Comment
                    author={props.comment.User && props.comment.User.nickname}
                    avatar={<Avatar>{props.comment.User && props.comment.User.nickname[0]}</Avatar>}
                    content={(
                        <p style={{ display: 'inline'}}>
                            {props.comment.content}
                            {props.comment.User.id === id && ChildResponseToNumber == 0
                                ? (<Button 
                                    type='text'
                                    shape='circle'
                                    onClick={onRemoveComment(props.comment.id)}
                                    ><DeleteOutlined style={{ paddingBottom: '5px'}}/>
                                    </Button>)
                                : null}
                            <TimeStamp>{dayjs(props.comment.createdAt).locale('ko').fromNow()}</TimeStamp>
                        </p>
                    )}
                    />
                }
            
                {OpenReply && (props.depth === 1 || props.depth === 2) && (
                    <form style={{ display: 'flex', width:'90%', marginLeft:'20px' }} onSubmit={onSubmitReply}>
                        <Input
                            style={{ width: '100%', borderRadius: '5px' }}
                            onChange={OnChangeCommentValue}
                            value={CommentValue}
                            placeholder="댓글을 작성해주세요."
                        />
                        <br/>
                        <Button style={{ width: '20%', height: '52px' }} htmlType="submit">Submit</Button>
                    </form>
                )}
            </div>
        </List>
    )
}

export default SingleComment