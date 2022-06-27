import { useState, useEffect } from "react"
import { fetchTopics } from "../utils/api"
import useScreenSize from "../utils/useScreenSize"
import Spinner from "./Spinner";

import { Box, Link, Typography } from "@mui/material"

import "../styles/allTopics.css";

const AllTopics = ({ currentTopic }) => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const width = useScreenSize();

    useEffect(() => {
        fetchTopics().then((res) => {
            setTopics(res);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return <Box component="section" className="allTopics-container">
            <Spinner />
        </Box>
    }

    if (width > 800) {
        return (
            <Box component="section" className="allTopics-container">
                <Typography variant="h3">Topics</Typography>

                {topics.map((topic, index) => currentTopic === topic.slug ?
                    <Typography className="current-topic" key={index}>{topic.slug}</Typography>
                    :
                    <Link href={`/${topic.slug}`} className="sidebar-link" key={index}>{topic.slug}</Link>
                )}
            </Box>
        )
    }
}

export default AllTopics