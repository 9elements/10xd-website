import client from "../contentful-client.js";

export default async () => {
  const magazinePremiumAbo = await client
    .getEntries({
      content_type: "pageMagazinePremiumAbo",
      include: 10,
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return magazinePremiumAbo;
};
