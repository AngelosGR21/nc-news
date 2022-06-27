import { useState } from "react"
import { Box, Link, Typography, IconButton } from "@mui/material"

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import "../../styles/dropdownTopics.css"

const DropdownTopics = ({ menuOpen, isLoading, topics }) => {
    const [showTopics, setShowTopics] = useState(false);
    return <Box className={menuOpen ? "dropdownTopics-menu dropdownTopics-expanded" : "dropdownTopics-menu"}>
        <Link href="/" variant="h3" className="dropdownTopics-link">Home</Link>
        <Box className="dropdownTopics-topics-container">
            <Typography variant="h3">Topics</Typography>
            <IconButton onClick={() => setShowTopics((prev) => !prev)}>
                <ArrowDropDownCircleIcon fontSize="large" className={showTopics ? "dropdownTopics-arrow-down dropdownTopics-arrow-reversed" : "dropdownTopics-arrow-down"} />
            </IconButton>
        </Box>
        {showTopics &&
            <Box className="dropdownTopics-all-topics-container" >
                {isLoading ? "..." : topics.map((topic, index) => {
                    return <Link className="dropdownTopics-topic-links" key={index} href={`/${topic.slug}`}>{topic.slug.toUpperCase()}</Link>
                })}
            </Box>
        }
    </Box>
}

export default DropdownTopics