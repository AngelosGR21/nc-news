const axios = require("axios").default;

const origin = axios.create({
  baseURL: "https://nc-news-project-nc.herokuapp.com/api",
});

exports.fetchArticles = async (topic) => {
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

exports.fetchTopics = async () => {
  try {
    const response = await origin.get("/topics");
    return response.data.topics;
  } catch (e) {
    console.log(e);
  }
};
