import client from "../contentful-client.js";

export default async () => {
  const pageMedia = await client
    .getEntries({
      content_type: "pageMedia",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageMedia[0].fields;
};
