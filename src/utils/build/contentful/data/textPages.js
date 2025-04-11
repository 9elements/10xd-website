import client from "../contentful-client.js";

export default async () => {
  const textPages = await client
    .getEntries({
      content_type: "pageTextPages",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return textPages;
};
