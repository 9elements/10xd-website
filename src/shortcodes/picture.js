const Image = require("@11ty/eleventy-img");
async function pictureShortcode(
  src,
  alt,
  widths = [300, 600],
  sizes = "100vw",
  imgOptions
) {
  if (src.startsWith("//")) {
    src = "https:" + src;
  }

  let options = "";

  if (imgOptions) {
    imgOptions.forEach((option, index) => {
      if (index == 0) {
        options = "?" + option;
      } else {
        options = options + "&" + option;
      }
    });
  }
  src = src + options;

  let metadata = await Image(src, {
    widths: widths,
    formats: ["avif", "jpeg"],
    outputDir: "./dist/images/ctfl/",
    urlPath: "/images/ctfl/",
    cacheOptions: {
      // if a remote image URL, this is the amount of time before it fetches a fresh copy
      duration: "1d",
      // project-relative path to the cache directory
      directory: ".cache",
      removeUrlQueryParams: false,
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = pictureShortcode;
