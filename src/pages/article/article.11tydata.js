import eleventyImage from "@11ty/eleventy-img";
import client from "../../utils/build/contentful/contentful-client.js";

const heroImage = async (data) => {
  let url;
  let stats;
  let options = {
    formats: ["png"],
    widths: ["1216"],
    urlPath: "/images/ctfl/meta",
    outputDir: "dist/images/ctfl/meta",
  };
  if (data.article.fields !== undefined) {
    if (data.article.fields.author.fields.portrait !== undefined) {
      url = data.article.fields.author.fields.portrait.fields.file.url;
      // This uses contentful's image modification to get a png
      // with an aspect ratio of 2:1
      url = "https:" + url + "?fm=png&fit=fill&f=face&w=1193&h=492";
      stats = await eleventyImage(url, options);
    }
  }

  if (url !== undefined) {
    return stats.png[0].url;
  } else {
    return false;
  }
};

const paginationButtons = async (data) => {
  const buttons = { previousButton: "", nextButton: "" };
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
    if (
      magazine.fields.articles.some(
        (article) => article.sys.id === data.article.sys.id
      )
    ) {
      const currentArticleIndex = magazine.fields.articles.findIndex(
        (article) => article.sys.id === data.article.sys.id
      );
      const previousArticleIndex = Number(currentArticleIndex - 1);
      const nextArticleIndex = Number(currentArticleIndex + 1);

      if (previousArticleIndex >= 0) {
        buttons.previousButton =
          magazine.fields.articles[previousArticleIndex].fields.headline;
      }

      if (nextArticleIndex <= magazine.fields.articles.length - 1) {
        buttons.nextButton =
          magazine.fields.articles[nextArticleIndex].fields.headline;
      }
    }
  });

  return buttons;
};

export default {
  eleventyComputed: {
    heroImageUrl: (data) => {
      return heroImage(data);
    },
    paginationButtons: (data) => {
      return paginationButtons(data);
    },
  },
};
