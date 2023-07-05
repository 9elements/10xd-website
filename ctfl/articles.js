// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const articles = await client
    .getEntries({
      content_type: "magazineArticle",
    })
    .then(async function (response) {
      const magazines = await client
        .getEntries({
          content_type: "magazine",
          include: 10,
          order: "-fields.publicationDate",
        })
        .then(function (response) {
          // console.log(response.items);
          return response.items;
        })
        .catch(console.error);

      const items = response.items.map(function (item) {
        magazines.forEach((magazine) => {
          const isMatchedFound = magazine.fields.articles.some(
            (article) => article.sys.id === item.sys.id
          );
          if (isMatchedFound) {
            item.magazine = magazine.fields.focus;
          }
        });
        return item;
      });
      return items;
    })
    .catch(console.error);

  return articles;
};
