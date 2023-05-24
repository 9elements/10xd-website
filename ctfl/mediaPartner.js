// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const mediaPartner = await client
    .getEntries({
      content_type: "mediaPartner",
      order: "fields.companyName",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return mediaPartner;
};
