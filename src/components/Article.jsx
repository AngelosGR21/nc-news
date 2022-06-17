import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import AllTopics from "./AllTopics";
import Spinner from "./Spinner";
import { fetchArticle } from "../utils/api";


import pageContainer from "../styles/mainContainers";
import articleStyles from "../styles/article"

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CommentIcon from '@mui/icons-material/Comment';

const Article = () => {
    const {article_id} = useParams();
    const [article, setArticle] = useState([]);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArticle(article_id).then((res) => {
            if(res === 404){
                setIsError("Article was not found");
                setIsLoading(false);
            }else{
                setArticle(res);
                setIsLoading(false);
            }
        })
    },[])

    if(isLoading){
        return (
            <Box sx={pageContainer}>
            <AllTopics/>
            <Spinner/>
            </Box>
          )
    }

    if(isError){
        return (
            <Box sx={pageContainer}>
            <AllTopics/>
            <Typography variant="h3">{isError}</Typography>
            </Box>
          )
    }

  return (
    <Box sx={pageContainer} component="section">
        <AllTopics/>
        <Box sx={articleStyles.articleContainer} component="article">
            <Box sx={articleStyles.articleInfo}>
                <Typography component="h1" mb={3}>{article.title} by {article.author}</Typography>
                <Typography component="p">{article.body}</Typography>
            </Box>
            <Box component="section">
                <IconButton>
                    <ArrowUpwardIcon/>
                </IconButton>
                <IconButton>
                    <CommentIcon/>
                </IconButton>
            </Box>
            <Box component="section">

            </Box>
        </Box>
    </Box>
  )
}

export default Article