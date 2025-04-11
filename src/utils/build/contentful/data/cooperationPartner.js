import client from "../contentful-client.js";

export default async () => {
  const cooperationPartner = await client
    .getEntries({
      content_type: "cooperationPartner",
      order: "fields.companyName",
    })
    .then(function (response) {
      const items = response.items.map(function (item) {
        return item;
      });
      return items;
    })
    .catch(console.error);

  return cooperationPartner;
};
