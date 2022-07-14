const axios = require("axios").default;

const origin = axios.create({
  baseURL: "https://nc-news-project-nc.herokuapp.com/api",
});

export const fetchArticles = async (topic, sort_by, order) => {
  try {
    let endpoint = "/articles";
    const response = await origin.get(endpoint, {
      params: {
        ...(topic && {topic}),
        ...(sort_by && {sort_by}),
        ...(order && {order}),
      },
    });
    return response.data.articles;
  } catch (e) {
    if (e.response.status === 404) return 404;
  }
};

export const fetchTopics = async () => {
  try {
    const response = await origin.get("/topics");
    return response.data.topics;
  } catch (e) {
    return e.response.status
  }
};

export const fetchArticle = async (id) => {
  try {
    const response = await origin.get(`/articles/${id}`);
    return response.data.article;
  } catch (e) {
    return e.response.status 
  }
};

export const fetchUsers = async () => {
  try {
    const response = await origin.get("/users");
    return response.data.users;
  } catch (e) {
    return 500
  }
};

export const patchVotes = async (article_id, inc_votes) => {
  try {
    await origin.patch(`/articles/${article_id}`, {
      inc_votes,
    });
  } catch (e) {
    return 400;
  }
};

export const fetchComments = async (article_id) => {
  try{
    const comments = await origin.get(`/articles/${article_id}/comments`)
    return comments.data.comments;
  }catch(e){
    return 400;
  }
}


export const patchCommentVotes = async (comment_id, inc_votes) => {
  try{
    await origin.patch(`/comments/${comment_id}`, {
      inc_votes
    })
  }catch(e){
    return 500;
  }
}

export const postComment = async (article_id, body, username) => {
  try{
    const createdComment = await origin.post(`/articles/${article_id}/comments`, {body, username})
    return createdComment.data.comment
  }catch(e){
    return e.response.status
  }
}

export const deleteComment = async (comment_id) => {
  try{
    await origin.delete(`/comments/${comment_id}`)
    return 200;
  }catch(e){
    if(e.response.status === 404) return 404;
  }
}