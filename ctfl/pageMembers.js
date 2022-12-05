// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageMembers = await client
    .getEntries({
      content_type: "pageMembers",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageMembers[0].fields;
};
