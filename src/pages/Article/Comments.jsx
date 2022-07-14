import { useState, useEffect } from "react";
import { fetchComments } from "../../utils/api";
import { Box } from "@mui/material";
import SingleComment from "./SingleComment";
import PostComment from "./PostComment";

import Spinner from "../../components/Spinner";

import "../../styles/comments.css";

const Comments = ({ article_id }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newlyPostedComment, setNewlyPostedComment] = useState(null);


    const avatar = localStorage.getItem("avatar");

    useEffect(() => {
        fetchComments(article_id).then((res) => {
            setComments(res);
            setIsLoading(false);
        })
    }, [article_id])


    if (isLoading) {
        return <Spinner />
    }



    return (
        <Box component="section">
            {avatar && <PostComment comments={comments} setComments={setComments} avatar={avatar} article_id={article_id} setNewlyPostedComment={setNewlyPostedComment} />}

            {newlyPostedComment && <SingleComment comment={newlyPostedComment} />}

            {comments.map((comment) => {
                return <SingleComment comment={comment} key={comment.comment_id} />
            })}
        </Box>
    )
}

export default Comments