import SortBy from "./SortBy";
import { Box, Typography } from "@mui/material";

import Link from '@mui/material/Link';

import "../styles/articles.css";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CommentIcon from '@mui/icons-material/Comment';

const Articles = ({ articles, currentTopic, setIsLoading, setArticles }) => {
    return (
        <Box component="main" className="articles-main-container">
            <SortBy currentTopic={currentTopic} setIsLoading={setIsLoading} setArticles={setArticles} />
            {articles.map((article) => {
                const { article_id, title, body, topic, votes, comment_count, author } = article;

                return <Box key={article_id} component="article" className="articles-article-container">
                    <Box className="articles-headers-container">
                        <Typography>{topic} - created by: {author}</Typography>
                        <Link href={`/${topic}/${article_id}`}>Read Article</Link>
                    </Box>
                    <Box component="header">
                        <Typography variant="h5" component="h5" className="articles-title">{title}</Typography>
                        <Typography variant="p" component="p">{body.slice(0, 200)}...</Typography>
                    </Box>
                    <Box component="section" className="articles-containers articles-reactions-container">
                        <Box className="articles-containers articles-votes-container" component="div">
                            <ArrowUpwardIcon className="articles-icons" />
                            <Typography component="p">{votes}</Typography>
                        </Box>
                        <Box className="articles-containers" component="div">
                            <CommentIcon className="articles-icons" />
                            <Typography component="p">{comment_count}</Typography>
                        </Box>
                    </Box>
                </Box>
            })}
        </Box >
    )
}

export default Articles