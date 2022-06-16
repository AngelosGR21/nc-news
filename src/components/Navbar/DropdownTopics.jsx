import {useState} from "react"
import {Box, Link, Typography, IconButton} from "@mui/material"
import dropdownTopicsStyles from "../../styles/dropdownTopics";

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const DropdownTopics = ({menuOpen, isLoading, topics}) => {
    const [showTopics, setShowTopics] = useState(false);
    return <Box sx={menuOpen ? {...dropdownTopicsStyles.menu, ...dropdownTopicsStyles.expandDropdown} : dropdownTopicsStyles.menu}>
        <Link href="/" variant="h3" sx={dropdownTopicsStyles.dropdownHomeLink}>Home</Link>
        <Box sx={dropdownTopicsStyles.topicsDropdownContainer}>
        <Typography variant="h3">Topics</Typography>
        <IconButton onClick={() => setShowTopics((prev) => !prev)}>
            <ArrowDropDownCircleIcon fontSize="large" sx={showTopics ? {...dropdownTopicsStyles.arrowDown , ...dropdownTopicsStyles.arrowReversed} : dropdownTopicsStyles.arrowDown}/>
        </IconButton>
        </Box>
        {showTopics && 
            <Box sx={dropdownTopicsStyles.topicsContainer}>
            {isLoading? "..." : topics.map((topic, index) => {
            return <Link sx={dropdownTopicsStyles.topicLinks} key={index} href={`/${topic.slug}`}>{topic.slug.toUpperCase()}</Link>
            })}
            </Box>
        }
    </Box>
}

export default DropdownTopics