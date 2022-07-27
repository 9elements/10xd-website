// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const services = await client
    .getEntries({
      content_type: "service",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return services;
};
