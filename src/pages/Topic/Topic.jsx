import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchArticles } from "../../utils/api"

import Spinner from "../../components/Spinner"
import Articles from "../../components/Articles"
import AllTopics from "../../components/AllTopics"
import NotFound from "../ErrorPage/ErrorPage"

import { Box } from "@mui/material"
import "../../styles/mainContainer.css";

const Topic = () => {
    const { topic_name } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchArticles(topic_name).then((res) => {
            if (res === 404) {
                setErrorMessage(`Topic "${topic_name}" was not found`);
                setIsLoading(false);
            } else {
                setArticles(res);
                setIsLoading(false);
            }
        })
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    if (errorMessage) {
        return <NotFound message={errorMessage} />
    }

    return (
        <Box component="section" className="global-exported-container">
            <AllTopics currentTopic={topic_name} />
            <Articles articles={articles} currentTopic={topic_name} setIsLoading={setIsLoading} setArticles={setArticles} />
        </Box>
    )
}

export default Topic