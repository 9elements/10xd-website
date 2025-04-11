import eleventyImage from "@11ty/eleventy-img";

const generateHeroImageUrl = async (imageUrl) => {
  const options = {
    formats: ["png"],
    widths: [1216],
    urlPath: "/assets/images/ctfl/meta",
    outputDir: "dist/assets/images/ctfl/meta",
  };

  // Use Contentful's image modification to get a PNG with a 2:1 aspect ratio
  const modifiedUrl = `https:${imageUrl}?fm=png&fit=fill&w=1193&h=492`;
  const stats = await eleventyImage(modifiedUrl, options);

  return stats.png[0].url;
};

const heroImage = async (data) => {
  console.log(
    `Generating hero image for format "${data?.format?.fields?.title}"`
  );
  const imageField = data?.format?.fields?.image?.fields?.file?.url;

  if (imageField) {
    return await generateHeroImageUrl(imageField);
  }

  return false;
};

export default {
  eleventyComputed: {
    heroImageUrl: (data) => heroImage(data),
  },
};
