import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import NotFound from "../ErrorPage/ErrorPage";
import Comments from "./Comments";
import AllTopics from "../../components/AllTopics";
import Spinner from "../../components/Spinner";
import { fetchArticle, patchVotes } from "../../utils/api";


import "../../styles/mainContainer.css"
import "../../styles/article.css"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CommentIcon from '@mui/icons-material/Comment';

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState([]);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [upvoted, setUpvoted] = useState(0);

    useEffect(() => {
        fetchArticle(article_id).then((res) => {
            if (res === 404 || res === 400) {
                setIsError("Article was not found");
                setIsLoading(false);
            } else {
                setArticle(res);
                setIsLoading(false);
            }
        })
    }, [])

    const handleUpvote = (id) => {
        if (upvoted === 1) {
            setUpvoted((currVotes) => currVotes - 1);
            patchVotes(id, -1).then((res) => {
                if (res === 500) {
                    setUpvoted(1);
                }
            })
        } else {
            setUpvoted((currVotes) => currVotes + 1);
            patchVotes(id, 1).then((res) => {
                if (res === 500) {
                    setUpvoted(0);
                }
            })
        }
    }

    if (isLoading) {
        return (
            <Box className="global-exported-container">
                <AllTopics />
                <Spinner />
            </Box>
        )
    }

    if (isError) {
        return (
            <NotFound message={isError} />
        )
    }


    return (
        <Box className="single-article-container" component="section">
            <AllTopics />
            <Box className="article-article-container" component="article">
                <Box>
                    <Typography variant="h4" component="h1" mb={3} className="article-title">{article.title} </Typography>
                    <Typography component="p" className="article-body">{article.body}</Typography>
                    <Typography component="p" className="article-credits">Posted by - {article.author}</Typography>
                </Box>
                <Box component="section">
                    <IconButton color={upvoted ? "error" : "primary"} onClick={() => handleUpvote(article.article_id)}>
                        <ArrowUpwardIcon />
                        <Typography>{article.votes + upvoted}</Typography>
                    </IconButton>
                    <IconButton color="primary">
                        <CommentIcon />
                        <Typography>{article.comment_count}</Typography>
                    </IconButton>
                </Box>
                <Comments article_id={article_id} />
            </Box>
        </Box>
    )
}

export default Article