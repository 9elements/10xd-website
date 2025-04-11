import client from "../contentful-client.js";

export default async () => {
  const pageHome = await client
    .getEntries({
      content_type: "pageHome",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageHome[0].fields;
};
