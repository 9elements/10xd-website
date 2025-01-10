// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const pageEnglisch = await client
    .getEntries({
      content_type: "pageEnglisch",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageEnglisch[0].fields;
};
