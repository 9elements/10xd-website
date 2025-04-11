import client from "../contentful-client.js";

export default async () => {
  const articles = [];
  const magazines = await client
    .getEntries({
      content_type: "magazine",
      include: 10,
      order: "-fields.publicationDate",
    })
    .then(function (response) {
      // console.log(response.items);
      return response.items;
    })
    .catch(console.error);

  magazines.forEach((magazine) => {
    if (!magazine.fields?.articles) return;

    magazine.fields.articles.forEach((article) => {
      console.log(magazine.sys.id);
      article.magazine = {
        id: magazine.sys.id,
        focus: magazine.fields.focus,
      };
      articles.push(article);
    });
  });

  magazines.articles = articles;

  return magazines;
};
