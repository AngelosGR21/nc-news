const axios = require("axios").default;

const origin = axios.create({
  baseURL: "https://nc-news-project-nc.herokuapp.com/api",
});

export const fetchArticles = async (topic) => {
  try {
    let endpoint = "/articles";
    const response = await origin.get(endpoint, {
      params: {
        topic,
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
    console.log(e);
  }
};

export const fetchArticle = async (id) => {
  try {
    const response = await origin.get(`/articles/${id}`);
    return response.data.article;
  } catch (e) {
    console.log(e);
    if (e.response.status === 404) return 404;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await origin.get("/users");
    return response.data.users;
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
}