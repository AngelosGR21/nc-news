import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import "../styles/notFound.css"

const NotFound = ({ message }) => {
    return (
        <Box className="not-found-container">
            <Typography variant="h4" className="not-found-header">{message ? message : "404 Page not found"}</Typography>
            <Link className="not-found-link" to="/">Homepage</Link>
        </Box>
    )
}

export default NotFound