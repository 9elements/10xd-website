import client from "../contentful-client.js";

export default async () => {
  const pageMembers = await client
    .getEntries({
      content_type: "pageMembers",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageMembers[0].fields;
};
