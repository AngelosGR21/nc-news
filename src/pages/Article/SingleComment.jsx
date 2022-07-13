import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { patchCommentVotes, deleteComment } from "../../utils/api";

const SingleComment = ({ comment }) => {
    const { comment_id, created_at, author, avatar_url, votes, body } = comment;
    const [upvoted, setUpvoted] = useState(0);
    const [deleted, setDeleted] = useState(null);
    const parsedDate = parseISO(created_at);
    const elapsedTime = formatDistanceToNow(parsedDate);

    const ownsComment = localStorage.getItem("username") === author;


    const handleDelete = (comment_id) => {
        deleteComment(comment_id);
        setDeleted(true);
    }

    const handleUpvote = (comment_id) => {
        if (upvoted === 1) {
            setUpvoted((currVotes) => currVotes - 1);
            patchCommentVotes(comment_id, -1).then((res) => {
                if (res === 500) {
                    setUpvoted(0);
                }
            })
        } else {
            setUpvoted((currVotes) => currVotes + 1);
            patchCommentVotes(comment_id, 1).then((res) => {
                if (res === 500) {
                    setUpvoted(0);
                }
            })
        }
    }

    return (
        <Box key={comment_id} className={deleted ? "deleted-comment" : "comment-container"}>
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
        </Box >
    )
}

export default SingleComment