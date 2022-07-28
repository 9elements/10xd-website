// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageServices = await client
    .getEntries({
      content_type: "pageServices",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageServices[0].fields;
};
