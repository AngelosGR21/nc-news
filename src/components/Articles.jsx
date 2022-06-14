import { Box, Typography } from "@mui/material";

// import { Link } from "react-router-dom";
import Link from '@mui/material/Link';

import articlesStyles from "../styles/articles"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CommentIcon from '@mui/icons-material/Comment';

const Articles = ({articles}) => {
  return (
    <Box component="main">
    {articles.map((article) => {
        const {article_id, title, body, topic, votes, comment_count, author} = article;
        return <Box key={article_id} component="article" sx={articlesStyles.articleContainer}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography>{topic} - created by: {author}</Typography>
                    <Link href="">Read Article</Link>
                </Box>
                <Typography variant="h5" component="h5" sx={articlesStyles.title}>{title}</Typography>
                <Typography variant="p" component="p">{body.slice(0, 100)}...</Typography>
                <Box component="section" sx={articlesStyles.containers}>
                    <Box sx={{...articlesStyles.containers, ...articlesStyles.votesContainer}} component="div">
                        <ArrowUpwardIcon sx={articlesStyles.icons}/>
                        <Typography component="p">{votes}</Typography>
                    </Box>
                    <Box sx={{...articlesStyles.containers}} component="div">
                        <CommentIcon sx={articlesStyles.icons}/>
                        <Typography component="p">{comment_count}</Typography>
                    </Box>
                </Box>
                <Box>

                </Box>
               </Box>
    })}
    </Box>
  )
}

export default Articles