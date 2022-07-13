export const transformSortValue = (sort) => {
    if(sort === "Date") return "created_at";
    if(sort === "Total comments") return "comment_count";
    
    return sort.toLowerCase();
}

export const transformOrderValue = (order) => {
    if(order === "Descending") return "DESC";
    if(order === "Ascending") return "ASC"; 
}