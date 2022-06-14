import {useState, useEffect} from "react"

import Spinner from "./Spinner";
import Articles from "./Articles"

import { fetchArticles } from "../utils/api";

const Home = () => { 
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      fetchArticles().then((res) => {
        setArticles(res);
        setIsLoading(false);
      })
    },[])


    if(isLoading){
      return <Spinner/>
    }

  return (
    <>
    <Articles articles={articles}/>
    </>
  )
}

export default Home