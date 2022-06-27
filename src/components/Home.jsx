import { useState, useEffect } from "react"

import Spinner from "./Spinner";
import Articles from "./Articles"
import AllTopics from "./AllTopics"

import { Box } from "@mui/material";
import { fetchArticles } from "../utils/api";

import "../styles/mainContainer.css";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((res) => {
      setArticles(res);
      setIsLoading(false);
    })
  }, [])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box className="global-exported-container" component="section">
      <AllTopics />
      <Articles articles={articles} />
    </Box>
  )
}

export default Home