import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { patchCommentVotes } from "../utils/api";

const SingleComment = ({ comment }) => {
    const { comment_id, created_at, author, avatar_url, votes, body } = comment;
    const [upvoted, setUpvoted] = useState(0);
    const parsedDate = parseISO(created_at);
    const elapsedTime = formatDistanceToNow(parsedDate);


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
        <Box key={comment_id} className="comment-container">
            <Box className="details-container">
                <Box className="avatar-author-container">
                    <img src={avatar_url} className="comment-avatar" alt="avatar" />
                    <Typography className="comment-author">{author}</Typography>
                    <IconButton
                        className="upvote-container"
                        color={upvoted ? "error" : "primary"}
                        onClick={() => handleUpvote(comment_id)}>
                        <ArrowUpwardIcon />
                        <Typography>{votes + upvoted}</Typography>
                    </IconButton>
                </Box>
                <Typography>{body} - <Typography variant="span" className="elapsed-time">{elapsedTime}</Typography></Typography>
            </Box>
        </Box>
    )
}

export default SingleComment