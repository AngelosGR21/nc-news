import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, FormControl, InputLabel, Select, MenuItem, ListItemText, OutlinedInput, Button } from "@mui/material";
import { fetchArticles } from "../utils/api";
import { transformSortValue, transformOrderValue } from "../utils/transformValues";

import "../styles/sortBy.css";

const SortBy = ({ currentTopic, setIsLoading, setArticles }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortByValue, setSortByValue] = useState("");
    const [orderValue, setOrderValue] = useState("");

    const acceptedSorts = ["Votes", "Title", "Date", "Author", "Total comments", "Topic"]

    const handleSort = (e) => {
        setSortByValue(e.target.value);
    }

    const handleOrder = (e) => {
        setOrderValue(e.target.value);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let updatedSortValue = "";
        let updatedOrderValue = "";
        if (sortByValue) {
            updatedSortValue = transformSortValue(sortByValue);
        }
        if (orderValue) {
            updatedOrderValue = transformOrderValue(orderValue);
        }

        const response = await fetchArticles(currentTopic, updatedSortValue, updatedOrderValue);
        if (updatedSortValue && updatedOrderValue) {
            setSearchParams({ sort_by: updatedSortValue, order: updatedOrderValue });
        } else if (updatedSortValue) {
            setSearchParams({ sort_by: updatedSortValue });
        } else if (updatedOrderValue) {
            setSearchParams({ order: updatedOrderValue });
        }

        setArticles(response);
        setIsLoading(false);
    };

    return (
        <Box className="sort-by-container" component="form" onSubmit={handleSubmit}>
            <FormControl>
                <InputLabel id="sort-by-checkbox-label" className="sort-by-label">Sort by</InputLabel>
                <Select
                    labelId="sort-by-checkbox-label"
                    value={sortByValue}
                    input={<OutlinedInput className="sort-by-inputs" label="Sort by" />}
                    onChange={handleSort}
                    renderValue={(selected) => selected}
                >
                    {acceptedSorts.map((sortName) => {
                        return <MenuItem key={sortName} value={sortName}>
                            <ListItemText primary={sortName} />
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="order-label" className="sort-by-label">Order</InputLabel>
                <Select
                    labelId="order-label"
                    value={orderValue}
                    input={<OutlinedInput className="sort-by-inputs" label="Order" />}
                    onChange={handleOrder}
                    renderValue={(selected) => selected}
                >
                    <MenuItem value="Ascending">Ascending</MenuItem>
                    <MenuItem value="Descending">Descending</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained">Sort</Button>
        </Box >
    )
}

export default SortBy