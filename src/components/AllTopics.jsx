import {useState, useEffect} from "react"
import { fetchTopics } from "../utils/api"
import useScreenSize from "../utils/useScreenSize"
import Spinner from "./Spinner";

import {Box, Link, Typography} from "@mui/material"

import allTopicsStyles from "../styles/allTopics";

const AllTopics = ({currentTopic}) => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const width = useScreenSize();

    useEffect(() => {
        fetchTopics().then((res) => {
            setTopics(res);
            setIsLoading(false);
        })
    }, [])

if(isLoading){
    return <Box component="section" sx={allTopicsStyles.allTopicsContainer}>
        <Spinner/>
    </Box>
}

if(width > 800){   
    return (
      <Box component="section" sx={allTopicsStyles.allTopicsContainer}>
          <Typography variant="h3">Topics</Typography>

          {topics.map((topic, index) => currentTopic === topic.slug ? 
          <Typography sx={allTopicsStyles.currentTopic} key={index}>{topic.slug}</Typography>  
          : 
          <Link href={`/${topic.slug}`} key={index} sx={allTopicsStyles.link}>{topic.slug}</Link>
    )}
      </Box>
    )
  }
}

export default AllTopics