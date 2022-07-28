// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageLocations = await client
    .getEntries({
      content_type: "pageLocations",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageLocations[0].fields;
};
