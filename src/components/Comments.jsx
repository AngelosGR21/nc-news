import { useState, useEffect } from "react";
import { fetchComments, postComment } from "../utils/api";
import { Box, TextField, Button } from "@mui/material";
import SingleComment from "./SingleComment";

import Spinner from "./Spinner";

import "../styles/comments.css";

const Comments = ({ article_id }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("avatar"));
    const [newlyPostedComment, setNewlyPostedComment] = useState(null);

    const [commentBody, setCommentBody] = useState("");

    useEffect(() => {
        fetchComments(article_id).then((res) => {
            setComments(res);
            setIsLoading(false);
        })
    }, [article_id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCommentBody("");
        const postedComment = await postComment(article_id, commentBody, localStorage.getItem("username"));
        postedComment.avatar_url = localStorage.getItem("avatar");
        postedComment.created_at = new Date().toISOString();
        setNewlyPostedComment(postedComment);
    }

    if (isLoading) {
        return <Spinner />
    }



    return (
        <Box component="section">
            {isLoggedIn && <Box className="write-comment-container" component="form" onSubmit={handleSubmit}>
                <img src={isLoggedIn} alt="your avatar" className="write-comment-avatar" />
                <TextField className="comment-text-field" placeholder="Write a comment..." onChange={(e) => setCommentBody(e.target.value)} value={commentBody} />
                <Button variant="contained" className="post-button" type="submit">Post</Button>
            </Box>}

            {newlyPostedComment && <SingleComment comment={newlyPostedComment} />}

            {comments.map((comment) => {
                return <SingleComment comment={comment} key={comment.comment_id} />
            })}
        </Box>
    )
}

export default Comments