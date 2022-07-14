import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { patchCommentVotes, deleteComment } from "../../utils/api";

import Feedback from "../../components/Snackbar";

const SingleComment = ({ comment }) => {
    const { comment_id, created_at, author, avatar_url, votes, body } = comment;
    const [upvoted, setUpvoted] = useState(0);
    const [deleted, setDeleted] = useState(null);
    //snackbar states
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const parsedDate = parseISO(created_at);
    const elapsedTime = formatDistanceToNow(parsedDate);

    const ownsComment = localStorage.getItem("username") === author;

    const handleUpvote = (comment_id) => {
        setSeverity("success");
        if (upvoted === 1) {
            setUpvoted((currVotes) => currVotes - 1);
            patchCommentVotes(comment_id, -1).then((res) => {
                if (res === 500) {
                    setUpvoted(0);
                    setSeverity("error");
                    setFeedbackMessage("Something went wrong")
                    setOpen(true);
                } else {
                    setSeverity("info")
                    setFeedbackMessage("Upvote removed")
                    setOpen(true);
                }
            })
        } else {
            setUpvoted((currVotes) => currVotes + 1);
            patchCommentVotes(comment_id, 1).then((res) => {
                if (res === 500) {
                    setUpvoted(0);
                    setSeverity("error");
                    setFeedbackMessage("Something went wrong")
                    setOpen(true);
                } else {
                    setFeedbackMessage("Comment was upvoted!")
                    setOpen(true);
                }

            })
        }
    }

    const handleDelete = async (comment_id) => {
        const response = await deleteComment(comment_id);
        if (response !== 200) {
            setSeverity("error");
            setFeedbackMessage("Something went wrong");
        } else {
            setSeverity("info");
            setFeedbackMessage("Comment has been deleted")
            setOpen(true);
            setTimeout(() => {
                setDeleted(true);
            }, 1000)
        }

    }

    return (
        <Box key={comment_id} className={deleted ? "deleted-comment" : "comment-container"} >
            <Box className="details-container">
                <Box className="avatar-author-container">
                    <img src={avatar_url} className="comment-avatar" alt="avatar" />
                    <Typography className="comment-author">{author}</Typography>
                    {ownsComment &&
                        <IconButton
                            className="delete-container"
                            color="error"
                            onClick={() => handleDelete(comment_id)}
                        >
                            <DeleteForeverIcon />
                        </IconButton>}
                    <IconButton
                        className={ownsComment ? "upvote-container combined-container" : "upvote-container"}
                        color={upvoted ? "error" : "primary"}
                        onClick={() => handleUpvote(comment_id)}>
                        <ArrowUpwardIcon />
                        <Typography>{votes + upvoted}</Typography>
                    </IconButton>
                </Box>
                <Typography>{body} - <Typography variant="span" className="elapsed-time">{elapsedTime}</Typography></Typography>
            </Box>
            <Feedback message={feedbackMessage} open={open} severity={severity} setOpen={setOpen} />
        </Box >
    )
}

export default SingleComment