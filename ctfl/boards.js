// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const boards = await client
    .getEntries({
      content_type: "board",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return boards;
};
