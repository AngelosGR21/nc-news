import {useState, useEffect} from "react"
import useScreenSize from "../../utils/useScreenSize";
import { fetchTopics } from "../../utils/api";
import { AppBar, Toolbar, IconButton, Link, Typography} from '@mui/material';

import navbarStyles from "../../styles/navbar";
import "../../styles/hamburger.css"
import logo from "../../images/favicon-32x32.png"

import Hamburger from "./Hamburger"
import DropdownTopics from "./DropdownTopics";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const screenWidth = useScreenSize();
    
    useEffect(() => {
     fetchTopics().then((res) => {
        setTopics(res);
        setIsLoading(false);
     })
    },[])



if(screenWidth <= 800){
    return (
        <AppBar component="nav" sx={navbarStyles.appbar}>
            <Toolbar disableGutters sx={navbarStyles.container}>
                <IconButton>
                    <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                </IconButton>
            <img src={logo} alt="Logo" />
            <Link href="/login" sx={navbarStyles.link}>Login</Link>
            </Toolbar>
            <DropdownTopics menuOpen={menuOpen} topics={topics} isLoading={isLoading}/>
        </AppBar>
      )
    }
    

    return (
        <AppBar component="nav" sx={navbarStyles.appbar}>
            <Toolbar sx={navbarStyles.container}>
            <Link href="/" sx={navbarStyles.homeContainer}>
                <img src={logo} alt="Logo"/>
                <Typography variant="h5" ml={1} sx={navbarStyles.homeLink}>Home</Typography>
            </Link>
            <Link href="/login" sx={navbarStyles.link}>Login</Link>
            </Toolbar>
        </AppBar>
      )

}


export default Navbar