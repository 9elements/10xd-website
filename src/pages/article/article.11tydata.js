import eleventyImage from "@11ty/eleventy-img";
import client from "../../utils/build/contentful/contentful-client.js";

const getHeroImageUrl = async (data) => {
  console.log(`Generating hero image for "${data?.article?.fields?.headline}"`);

  if (!data.article?.fields?.author?.fields?.portrait?.fields?.file?.url) {
    return false;
  }

  const baseUrl = data.article.fields.author.fields.portrait.fields.file.url;
  const imageUrl = `https:${baseUrl}?fm=png&fit=fill&f=face&w=1193&h=492`;

  const options = {
    formats: ["png"],
    widths: ["1216"],
    urlPath: "/images/ctfl/meta",
    outputDir: "dist/images/ctfl/meta",
  };

  const stats = await eleventyImage(imageUrl, options);
  return stats.png[0]?.url || false;
};

const getPaginationButtons = async (data) => {
  console.log(
    `Generating pagination buttons for "${data?.article?.fields?.headline}"`
  );

  const buttons = { previousButton: "", nextButton: "" };

  try {
    const magazines = await client.getEntries({
      content_type: "magazine",
      include: 10,
      order: "-fields.publicationDate",
    });

    magazines.items.forEach((magazine) => {
      const articles = magazine.fields.articles || [];
      const currentArticleIndex = articles.findIndex(
        (article) => article.sys.id === data.article.sys.id
      );

      if (currentArticleIndex !== -1) {
        const previousArticle = articles[currentArticleIndex - 1];
        const nextArticle = articles[currentArticleIndex + 1];

        if (previousArticle) {
          buttons.previousButton = previousArticle.fields.headline;
        }

        if (nextArticle) {
          buttons.nextButton = nextArticle.fields.headline;
        }
      }
    });
  } catch (error) {
    console.error(error);
  }

  return buttons;
};

export default {
  eleventyComputed: {
    heroImageUrl: (data) => getHeroImageUrl(data),
    paginationButtons: (data) => getPaginationButtons(data),
  },
};
