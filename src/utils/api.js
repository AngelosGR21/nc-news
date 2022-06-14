const axios = require("axios").default;

const origin = axios.create({
  baseURL: "https://nc-news-project-nc.herokuapp.com/api",
});

exports.fetchArticles = async () => {
  try {
    const response = await origin.get("/articles");
    return response.data.articles;
  } catch (e) {
    console.log(e);
  }
};
