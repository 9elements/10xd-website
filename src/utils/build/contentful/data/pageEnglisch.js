import client from "../contentful-client.js";

export default async () => {
  const pageEnglisch = await client
    .getEntries({
      content_type: "pageEnglisch",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return pageEnglisch[0].fields;
};
