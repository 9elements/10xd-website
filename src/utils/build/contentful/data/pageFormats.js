import client from "../contentful-client.js";

export default async () => {
  const pageFormats = await client
    .getEntries({
      content_type: "pageFormats",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageFormats[0].fields;
};
