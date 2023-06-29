// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const magazinePremiumAbo = await client
    .getEntries({
      content_type: "pageMagazinePremiumAbo",
      include: 10,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return magazinePremiumAbo;
};
