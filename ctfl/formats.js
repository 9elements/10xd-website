// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const formats = await client
    .getEntries({
      content_type: "format",
      order: "fields.startDate",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return formats;
};
