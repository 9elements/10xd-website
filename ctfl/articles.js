// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const articles = await client
    .getEntries({
      content_type: "magazineArticle",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return articles;
};
