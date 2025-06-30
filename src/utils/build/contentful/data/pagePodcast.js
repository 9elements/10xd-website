import client from "../contentful-client.js";

export default async () => {
  const pagePodcast = await client
    .getEntries({
      content_type: "pagePodcast",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pagePodcast[0].fields;
};
