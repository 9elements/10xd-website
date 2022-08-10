// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageHome = await client
    .getEntries({
      content_type: "pageHome",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageHome[0].fields;
};
