// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageFormats = await client
    .getEntries({
      content_type: "pageFormats",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageFormats[0].fields;
};
