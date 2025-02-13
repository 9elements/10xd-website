// Import the client
const client = require("../src/utils/contentfulClient.js");

// Function to fetch all entries with pagination
const fetchAllEntries = async (query) => {
  const entries = [];
  let skip = 0;
  const limit = 100; // Maximum entries per request
  let total;

  do {
    const response = await client.getEntries({
      ...query,
      skip,
      limit,
    });
    entries.push(...response.items);
    total = response.total;
    skip += limit;
  } while (skip < total);

  return entries;
};

module.exports = async () => {
  try {
    // Fetch all articles
    const articles = await fetchAllEntries({
      content_type: "magazineArticle",
    });

    // Fetch all magazines
    const magazines = await fetchAllEntries({
      content_type: "magazine",
      include: 10,
      order: "-fields.publicationDate",
    });

    // Map articles to their corresponding magazine focus
    const items = articles.map((item) => {
      magazines.forEach((magazine) => {
        const isMatchedFound = magazine.fields.articles.some(
          (article) => article.sys.id === item.sys.id
        );
        if (isMatchedFound) {
          item.magazine = magazine.fields.focus;
        }
      });
      return item;
    });

    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};
