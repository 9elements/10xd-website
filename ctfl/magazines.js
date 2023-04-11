// import the client
const client = require("../src/utils/contentfulClient.js");

module.exports = async () => {
  const articles = []
  const magazine = await client
    .getEntries({
      content_type: "magazine",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);
  
    magazines.forEach((magazine) => {
      console.log(magazine.fields)
    })

  return magazine;
};
