import client from "../contentful-client.js";

export default async () => {
  const pageLocations = await client
    .getEntries({
      content_type: "pageLocations",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageLocations[0].fields;
};
