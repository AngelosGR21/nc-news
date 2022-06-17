import {useState, useEffect, useContext} from "react";
import {Navigate} from "react-router-dom";
import { fetchUsers } from "../utils/api";
import {Box, Button, Typography} from "@mui/material"
import UserContext from "../utils/UserContext";

import Spinner from "./Spinner";

import GlobalStyles from "@mui/material/GlobalStyles";
import loginStyles from "../styles/login";

const Login = () => {
    const {setAvatar, setUsername} = useContext(UserContext);
    const [users,setUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    
    useEffect(() => {
        fetchUsers().then((res) => {
            setUsers(res);
            setIsLoading(false);
        })
    }, [])

    const handleClick = (user) => {
        localStorage.setItem("username", user.username);
        localStorage.setItem("avatar", user.avatar_url);
        setAvatar(user.avatar_url);
        setUsername(user.username);
        setRedirect(true);
    }   

    if(redirect){
        return <Navigate to="/" replace/>
    }

    if(isLoading){
        return <Spinner/>
    }


  return (
    <Box component="section" sx={loginStyles.pageStyles}>
    <GlobalStyles styles={{body: {overflow: "visible"}}}/>
    {users.map((user, index) => {
        return <Box key={index} sx={loginStyles.userContainer}>
            <img src={user.avatar_url} alt={user.name} style={loginStyles.avatar}/>
            <Typography variant="h4">{user.username}</Typography>
            <Button color="error" sx={loginStyles.button} onClick={() => handleClick(user)}>Login</Button>
        </Box>
    })}
    </Box>
  )
}

export default Login