import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { postComment } from "../../utils/api";
import Feedback from "../../components/Snackbar";

const PostComment = ({ avatar, article_id, setComments, comments }) => {
    const [commentBody, setCommentBody] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");

    const handleClick = () => {
        if (commentBody) {
            setTimeout(() => {
                setOpen(true);
            }, 500)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSeverity("success");
        setCommentBody("");
        const postedComment = await postComment(article_id, commentBody, localStorage.getItem("username"));
        if (typeof postedComment === "number") {
            setFeedbackMessage("Something went wrong")
            setSeverity("error")
        } else {
            postedComment.avatar_url = localStorage.getItem("avatar");
            postedComment.created_at = new Date().toISOString();
            let updatedComments = [postedComment, ...comments];
            setComments(updatedComments);
            setFeedbackMessage("Comment was created!");
        }

    }
    return (
        <Box className="write-comment-container" component="form" onSubmit={handleSubmit}>
            <img src={avatar} alt="your avatar" className="write-comment-avatar" />
            <TextField multiline required className="comment-text-field" placeholder="Write a comment..." onChange={(e) => setCommentBody(e.target.value)} value={commentBody} />
            <Button type="submit"
                className="post-button"
                variant="contained"
                onClick={handleClick}
            >Post
            </Button>
            <Feedback message={feedbackMessage} open={open} setOpen={setOpen} severity={severity} />
        </Box>
    )
}

export default PostComment