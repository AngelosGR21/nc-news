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
